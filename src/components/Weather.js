import React from "react";
import style from "./Weather.module.css";

const Weather = ({ weather }) => {
  let weatherStyle = [style.weather];

  if (!weather) {
    weatherStyle = [...weatherStyle, style.placeholder];
  }

  return (
    <h2 className={weatherStyle.join(" ")}>{weather ? weather : "Weather"}</h2>
  );
};

export default Weather;
