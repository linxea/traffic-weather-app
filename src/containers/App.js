import React, { useState, useEffect } from "react";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import LocationSelector from "../components/LocationSelector";
import Weather from "../components/Weather";
import TrafficImages from "../components/TrafficImages";
import { getSortedArray } from "../utils/util";
import {
  getLocationNamesFromCoordinates,
  getWeatherData,
  getTrafficData,
} from "../api/api";
import {
  getCoordinatesList,
  getLocationNameMapping,
} from "../utils/coordinateUtil";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import style from "./App.module.css";
import "./Dropdown.css";

async function getParsedLocationNameMapping(selectedDate, selectedTime) {
  const weatherData = await getWeatherData(selectedDate, selectedTime);
  const trafficData = await getTrafficData(selectedDate, selectedTime);

  const coordinatesList = getCoordinatesList(trafficData);

  const { results } = await getLocationNamesFromCoordinates(coordinatesList);
  const locationNameList = results;

  const locationNameMapping = getLocationNameMapping(
    trafficData,
    weatherData,
    locationNameList
  );

  const availableLocations = getSortedArray(Object.keys(locationNameMapping));

  return { availableLocations, locationNameMapping };
}

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [locations, setLocations] = useState([]);
  const [locationNameMapping, setLocationNameMapping] = useState({});

  useEffect(() => {
    setLoading(true);
    const getLocationMappingAndWeather = async () => {
      try {
        const {
          availableLocations,
          locationNameMapping,
        } = await getParsedLocationNameMapping(selectedDate, selectedTime);

        setLocations(availableLocations);
        setLocationNameMapping(locationNameMapping);
        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    getLocationMappingAndWeather();
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    const currentLocation = selectedLocation || locations[0];
    setSelectedLocation(currentLocation);
  }, [locationNameMapping, locations, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.value);
  };

  return (
    <div className={style.app}>
      <div className={style.row}>
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div className={style.row}>
        <LocationSelector
          selectedLocation={selectedLocation}
          locations={locations}
          handleChange={handleLocationChange}
        />
        <Weather
          weather={locationNameMapping[selectedLocation]?.weather?.forecast}
        />
      </div>
      <div className={style.trafficContainer}>
        {isLoading ? (
          <div className={style.loading}></div>
        ) : (
          <TrafficImages
            images={locationNameMapping[selectedLocation]?.images}
            location={selectedLocation}
          />
        )}
        {isError && <h2>There is an error, please try again later. :(</h2>}
      </div>
    </div>
  );
};

export default App;
