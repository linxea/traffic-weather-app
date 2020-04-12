export function getCoordinatesList(trafficData) {
  let coordinatesList = [];

  if (trafficData?.items?.[0]?.cameras) {
    coordinatesList = trafficData?.items?.[0]?.cameras.reduce(
      (list, camera) => {
        const { latitude, longitude } = camera.location;
        const coordinateObject = {
          latLng: { lat: latitude, lng: longitude },
        };

        return [...list, coordinateObject];
      },
      []
    );
  }

  return coordinatesList;
}

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

          // Find nearest weather
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
