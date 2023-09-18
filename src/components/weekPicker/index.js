import React, { useRef, useState, useEffect } from "react";
import { useDetectOutsideClick } from "../../common/hooks/useDectOutsideClick";
import dropdownBlue from "../../assets/images/dropdownBlue.png";
import moment from "moment";

import "./index.css";

const WeekPicker = (props) => {
  const { onChange } = props;
  const dropdownRef = useRef(null);
  const [dateOptions, setDateOptions] = useState([]);
  const [selectDate, setSelectDate] = useState("");
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
    setSelectDate(dateOptions[0].label);
    onChange(dateOptions[0].label);
  }, []);

  const onClickDate = (e) => {
    e.stopPropagation();
    setIsActiveDate(!isActiveDate);
  };

  const handleOptionChange = (event) => {
    setSelectDate(event);
    onChange(event);
    setIsActiveDate(false);
  };

  const onKeyDownDate = (event) => {
    if (event.key === "Enter") {
      onClickDate(event);
    }
  };

  const onDateItemClick = (event, item) => {
    event.stopPropagation();
    handleOptionChange(item.label);
  };

  return (
    <div className="date-picker-container">
      <p>Select Week</p>
      <div
        className="date-select-wrapper"
        onClick={onClickDate}
        onKeyDown={onKeyDownDate}
        role="button"
        tabIndex={0}
        aria-label="Select Week"
      >
        <span className="dateName" tabIndex={-1}>
          {selectDate}
        </span>
        <img
          src={dropdownBlue}
          className="user-dropdown-icon"
          alt="Dropdown Icon for Select Week"
        />
      </div>
      <div
        ref={dropdownRef}
        className={`dataMenu ${isActiveDate ? "dateActive" : "inactive"}`}
        aria-hidden={!isActiveDate}
      >
        {dateOptions.map((val, index) => {
          return (
            <span
              key={index}
              className="date-list"
              onClick={(event) => onDateItemClick(event, val)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onDateItemClick(event, val);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={val.label}
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
