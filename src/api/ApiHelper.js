import { get, post } from "../utils/fetchUtil";
import { getDateAndTimeFormat } from "../utils/util";
import { getAlphabeticallySortedArray } from "../utils/util";
import {
  getCoordinatesList,
  getLocationNameMapping,
} from "../utils/coordinateUtil";

const DATA_API_URL = "https://api.data.gov.sg/v1/";
const MAP_API_URL = "https://www.mapquestapi.com/geocoding/v1/batch";
const MAP_API_KEY = process.env.REACT_APP_MAP_API_KEY;
const API_ENDPOINTS = {
  WEATHER: "environment/2-hour-weather-forecast",
  TRAFFIC: "transport/traffic-images",
};

export async function getLocationNamesFromCoordinates(coordinates) {
  const payload = {
    locations: coordinates,
  };

  const data = await post(`${MAP_API_URL}?key=${MAP_API_KEY}`, payload);
  return data;
}

export async function getWeatherData(queryStringDateTime) {
  const weatherData = await get(
    DATA_API_URL + API_ENDPOINTS.WEATHER + queryStringDateTime
  );
  return weatherData;
}

export async function getTrafficData(queryStringDateTime) {
  const trafficData = await get(
    DATA_API_URL + API_ENDPOINTS.TRAFFIC + queryStringDateTime
  );
  return trafficData;
}

function getQueryStringDateTime(date, time) {
  const queryStringDateTime = `?date_time=${getDateAndTimeFormat(date, time)}`;
  return queryStringDateTime;
}

/**
 * Return a sorted array of availableLocations and a locationNameMapping object
 * which contains location coordinates, array of images and weather information.
 *
 * Examples:
 * const availableLocations = ["Ayer Rajah Expressway", "Braddell Flyover"];
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
 * };
 *
 * @param {date} selectedDate
 * @param {date} selectedTime
 */
export async function getParsedLocationNameMapping(selectedDate, selectedTime) {
  const queryStringDateTime = getQueryStringDateTime(
    selectedDate,
    selectedTime
  );
  const weatherData = await getWeatherData(queryStringDateTime);
  const trafficData = await getTrafficData(queryStringDateTime);

  const coordinatesList = getCoordinatesList(trafficData);

  const { results } = await getLocationNamesFromCoordinates(coordinatesList);
  const locationNameList = results;

  const locationNameMapping = getLocationNameMapping(
    trafficData,
    weatherData,
    locationNameList
  );

  const availableLocations = getAlphabeticallySortedArray(
    Object.keys(locationNameMapping)
  );

  return { availableLocations, locationNameMapping };
}
