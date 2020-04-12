import React from "react";
import style from "./Weather.module.css";

const Weather = ({ weather }) => {
  let weatherStyle = [style.weather];

  if (!weather) {
    weatherStyle = [...weatherStyle, style.placeholder];
  }

  return (
    <h1 className={weatherStyle.join(" ")}>
      {weather ? weather : "Weather Forecast"}
    </h1>
  );
};

export default Weather;
