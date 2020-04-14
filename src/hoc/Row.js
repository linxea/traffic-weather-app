import React from "react";
import style from "./Row.module.css";

const Row = ({ children }) => <div className={style.row}>{children}</div>;

export default Row;
