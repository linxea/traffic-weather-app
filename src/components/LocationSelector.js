import React from "react";
import Dropdown from "react-dropdown";
import style from "./Selector.module.css";

const LocationSelector = ({ handleChange, selectedLocation, locations }) => (
  <Dropdown
    className={style.inputStyle}
    options={locations}
    value={selectedLocation}
    placeholder="Location"
    onChange={handleChange}
  />
);

export default LocationSelector;
