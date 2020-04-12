import { get, post } from "../utils/fetchUtil";
import { getDateAndTimeFormat } from "../utils/util";

const DATA_API_URL = "https://api.data.gov.sg/v1/";
const MAP_API_URL = "https://www.mapquestapi.com/geocoding/v1/batch";
const MAP_API_KEY = "GhmKAs0ozEImsYnrApg0hG3krGG48SRV";

export async function getLocationNamesFromCoordinates(coordinates) {
  const payload = {
    locations: coordinates,
  };

  const data = await post(`${MAP_API_URL}?key=${MAP_API_KEY}`, payload);
  return data;
}

const API_ENDPOINTS = {
  WEATHER: "environment/2-hour-weather-forecast",
  TRAFFIC: "transport/traffic-images",
};

export async function getWeatherData(selectedDate, selectedTime) {
  const queryStringDateTime = getQueryStringDateTime(
    selectedDate,
    selectedTime
  );
  const weatherData = await get(
    DATA_API_URL + API_ENDPOINTS.WEATHER + queryStringDateTime
  );
  return weatherData;
}

export async function getTrafficData(selectedDate, selectedTime) {
  const queryStringDateTime = getQueryStringDateTime(
    selectedDate,
    selectedTime
  );

  const trafficData = await get(
    DATA_API_URL + API_ENDPOINTS.TRAFFIC + queryStringDateTime
  );
  return trafficData;
}

function getQueryStringDateTime(date, time) {
  const queryStringDateTime = `?date_time=${getDateAndTimeFormat(date, time)}`;
  return queryStringDateTime;
}
