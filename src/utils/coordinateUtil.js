/**
 * Convert the array of traffic camera coordinates to the format
 * required by Mapquest Batch API.
 *
 * @param {object} trafficData
 */
export function getCoordinatesList(trafficData) {
  if (!trafficData?.items?.[0]?.cameras) {
    return [];
  }

  const coordinatesList = trafficData?.items?.[0]?.cameras.reduce(
    (list, camera) => {
      const { latitude, longitude } = camera.location;
      const coordinateObject = {
        latLng: { lat: latitude, lng: longitude },
      };

      return [...list, coordinateObject];
    },
    []
  );

  return coordinatesList;
}

/**
 * Return an object of location name mapped to location coordinates,
 * array of images and weather information. locationNameList is a list
 * of location names following the order of data from trafficData. The
 * nearest weather is then mapped to the location name.
 *
 * const locationNameMapping = {
 *   ...
 *   "Braddell Flyover": {
 *      "latitude": 1.34355015,
 *      "longitude": 103.8601984,
 *      "images": [
 *        {
 *          "imageUrl": "https://images...jpg",
 *          "id": "1702"
 *        }
 *      ],
 *      "weather": {
 *        "area": "Toa Payoh",
 *        "forecast": "Fair (Night)"
 *      }
 *   ...
 * }
 *
 * @param {object} trafficData
 * @param {object} weatherData
 * @param {object} locationNameList
 */
export function getLocationNameMapping(
  trafficData,
  weatherData,
  locationNameList
) {
  let locationNameMapping = {};

  if (trafficData?.items?.[0]?.cameras) {
    const cameras = trafficData.items[0].cameras;

    for (let i = 0; i < cameras.length; i++) {
      const camera = cameras[i];
      const { latitude, longitude } = camera.location;
      const locationName = locationNameList[i]?.locations?.[0]?.street;
      if (locationName?.length) {
        if (locationNameMapping[locationName]) {
          locationNameMapping[locationName].images.push({
            imageUrl: camera.image,
            id: camera.camera_id,
          });
        } else {
          locationNameMapping[locationName] = {
            latitude,
            longitude,
            images: [
              {
                imageUrl: camera.image,
                id: camera.camera_id,
              },
            ],
          };

          // Find nearest weather using manhattan distance
          if (weatherData?.area_metadata) {
            let minDiff = 1;
            let nearestWeather = "";

            weatherData.area_metadata.forEach((area, index) => {
              const weatherLatitude = area?.label_location.latitude;
              const weatherLongitude = area?.label_location.longitude;

              const latDiff = Math.abs(
                latitude.toFixed(4) - weatherLatitude.toFixed(4)
              );

              const longDiff = Math.abs(
                longitude.toFixed(4) - weatherLongitude.toFixed(4)
              );

              const isWithinRange = latDiff + longDiff < minDiff;

              if (isWithinRange) {
                minDiff = latDiff + longDiff;
                nearestWeather = weatherData.items[0].forecasts[index];
              }
            });

            locationNameMapping[locationName].weather = nearestWeather;
          }
        }
      }
    }
  }

  return locationNameMapping;
}
