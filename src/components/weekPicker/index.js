import React, { useRef, useState, useEffect } from "react";
import { useDetectOutsideClick } from "../../common/hooks/useDectOutsideClick";
import dropdownBlue from "../../assets/images/dropdownBlue.png";
import moment from "moment";

import "./index.css";

const WeekPicker = (props) => {
  const { onChange } = props;
  const dropdownRef = useRef(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectDate, setSelecteDate] = useState("");
  const [isActiveDate, setIsActiveDate] = useDetectOutsideClick(
    dropdownRef,
    false
  );

  useEffect(() => {
    const today = moment();
    const dateOptions = [];

    // Add present week's date range
    const presentWeekStart = today.clone().startOf("isoWeek").isoWeekday(0);
    const presentWeekEnd = today.clone().endOf("isoWeek").isoWeekday(6);
    dateOptions.push({
      value: `${presentWeekStart.format(
        "MMM D, YYYY"
      )} - ${presentWeekEnd.format("MMM D, YYYY")}`,
      label: `${presentWeekStart.format(
        "MMM D, YYYY"
      )} - ${presentWeekEnd.format("MMM D, YYYY")}`,
    });

    // Add past 3 weeks' date ranges
    for (let i = 1; i <= 3; i++) {
      const start = today
        .clone()
        .subtract(i, "weeks")
        .startOf("isoWeek")
        .isoWeekday(0);
      const end = today
        .clone()
        .subtract(i, "weeks")
        .endOf("isoWeek")
        .isoWeekday(6);
      dateOptions.push({
        value: `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`,
        label: `${start.format("MMM D, YYYY")} - ${end.format("MMM D, YYYY")}`,
      });
    }

    setDateOptions(dateOptions);
    setSelecteDate(dateOptions[0].label);
    onChange(dateOptions[0].label);
  }, []);

  const onClickDate = (e) => {
    e.stopPropagation();
    setIsActiveDate(!isActiveDate);
  };

  const handleOptionChange = (event) => {
    setSelecteDate(event);
    onChange(event);
    setIsActiveDate(false);
  };

  return (
    <div className="date-picker-container">
      <p>Select Week</p>
      <div className="date-select-wrapper" onClick={onClickDate}>
        <span className="dateName">{selectDate}</span>
        <img src={dropdownBlue} className="user-dropdown-icon" />
      </div>
      <div
        ref={dropdownRef}
        className={`dataMenu ${isActiveDate ? "dateActive" : "inactive"}`}
      >
        {dateOptions.map((val, index) => {
          return (
            <span
              key={index}
              className="date-list"
              onClick={() => handleOptionChange(val.label)}
            >
              {val.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default WeekPicker;
