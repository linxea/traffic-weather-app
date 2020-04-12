import React from "react";
import DatePicker from "react-datepicker";
import style from "./Selector.module.css";

const DateSelector = ({ selectedDate, setSelectedDate }) => (
  <DatePicker
    dateFormat="dd/MM/yyyy"
    className={style.inputStyle}
    selected={selectedDate}
    onChange={setSelectedDate}
  />
);

export default DateSelector;
