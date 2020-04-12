import React from "react";
import DatePicker from "react-datepicker";
import style from "./Selector.module.css";

const TimeSelector = ({ selectedTime, setSelectedTime }) => (
  <DatePicker
    className={style.inputStyle}
    selected={selectedTime}
    onChange={setSelectedTime}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    timeCaption="Time"
    dateFormat="h:mm aa"
  />
);

export default TimeSelector;
