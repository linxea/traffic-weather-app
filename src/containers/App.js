import React, { useState, useEffect } from "react";
import DateSelector from "../components/DateSelector";
import TimeSelector from "../components/TimeSelector";
import LocationSelector from "../components/LocationSelector";
import Weather from "../components/Weather";
import ErrorMessage from "../components/ErrorMessage";
import TrafficContainer from "../components/TrafficContainer";
import Row from "../hoc/Row";
import { getParsedLocationNameMapping } from "../api/ApiHelper";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import style from "./App.module.css";
import "./Dropdown.css";

const API_ERROR_MESSAGE = "There is an error, please try again later. :(";

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
  }, [locations, selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.value);
  };

  return (
    <div className={style.mainContainer}>
      <Row>
        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <TimeSelector
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </Row>
      <Row>
        <LocationSelector
          selectedLocation={selectedLocation}
          locations={locations}
          handleChange={handleLocationChange}
        />
        <Weather
          weather={locationNameMapping[selectedLocation]?.weather?.forecast}
        />
      </Row>
      <div className={style.contentContainer}>
        {isError ? (
          <ErrorMessage text={API_ERROR_MESSAGE} />
        ) : (
          <TrafficContainer
            isLoading={isLoading}
            locationNameMapping={locationNameMapping}
            selectedLocation={selectedLocation}
          />
        )}
      </div>
    </div>
  );
};

export default App;
