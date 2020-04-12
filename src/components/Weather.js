import React from "react";
import style from "./Weather.module.css";

const Weather = ({ weather }) => {
  if (weather) {
    return <h1 className={style.weather}>{weather}</h1>;
  }
  return null;
};

export default Weather;
