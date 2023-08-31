import React, { useState, useEffect, useRef } from "react";
import cross from "../../assets/images/cross.png";
import generateFormattedDateArray from "../../common/commonFunctions/generateWeekDates";

import "./index.css";

const projectCode = ["WFS_1101", "WFS_1102"];
const jobCode = [
  "Dev-Analysis",
  "Dev-Implementation",
  "Dev-UnitTesting",
  "Dev-CodeReview",
  "RequirementGathering",
  "RequirementAnalysis",
  "TestCase-Writing",
  "TestCase-Execution",
  "TestCase-Automation",
];

const TimeCard = (props) => {
  const {
    duration,
    key,
    deleteRow,
    onChange,
    user,
    filled = false,
    status = "",
    filledData = {},
  } = props;
  const inputDefault = "";
  const [weekData, setWeekData] = useState(
    filledData?.hourlyData || Array(7).fill(inputDefault)
  );
  const [projectCodeValue, setProjectCodeValue] = useState(
    filledData?.projectCode
  );
  const [jobCodeValue, setJobCodeValue] = useState(filledData?.jobCode || "");
  const inputRefs = useRef([]);

  let week = generateFormattedDateArray(duration);

  useEffect(() => {
    inputRefs.current = Array(7)
      .fill(null)
      .map(() => React.createRef());
  }, []);

  console.log(filledData.projectCode, "projectCodeValue");
  // console.log(filledData, "projectCodeValue");

  useEffect(() => {
    if (!filled && status !== "rejected") {
      setProjectCodeValue("");
      setJobCodeValue("");
      setWeekData(Array(7).fill(inputDefault));
      inputRefs.current.forEach((inputRef) => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      });
    }
  }, [duration, user]);

  useEffect(() => {
    let payload = {
      projectCode: projectCodeValue,
      jobCode: jobCodeValue,
      week: duration,
      hourlyData: weekData,
      totalHoursLogged: getTotal(),
    };
    onChange(payload);
  }, [weekData, projectCodeValue, jobCodeValue]);

  const setInputValue = (event, index) => {
    let input = event.target.value;
    let temp = [...weekData];
    if (input && input >= 0 && input <= 16) {
      temp[index] = parseInt(input);
      setWeekData(temp);
    } else if (input < 0 || input > 16) {
      temp[index] = inputDefault;
      setWeekData(temp);
      event.target.value = "";
      alert("Hours should be between 0 and 16");
    } else {
      temp[index] = inputDefault;
      setWeekData(temp);
    }
  };

  const getTotal = () => {
    let sum = 0;
    console.log(weekData, "Total");
    for (let i = 0; i < weekData.length; i++) {
      if (weekData[i]) sum += weekData[i];
    }
    return sum;
  };

  // console.log(filled, "filled");
  // const disableInput = () => {
  //   console.log(status !== "rejected", "see");
  //   if (filled) {
  //     if (status !== "rejected")
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const listDateInput = () => {
    return week.map((day, i) => (
      <div key={day}>
        <p className="input-header">{day}</p>
        <input
          type="number"
          ref={inputRefs.current[i]}
          className="project-input hour-input"
          min={0}
          max={16}
          defaultValue={
            filled || status === "rejected"
              ? filledData.hourlyData[i]
              : undefined
          }
          // value={
          //   filled || status === "rejected" ? filledData.hourlyData[i] : undefined
          // }
          disabled={filled}
          onChange={(event) => setInputValue(event, i)}
        />
      </div>
    ));
  };

  return (
    <div className="timesheet-card" key={key}>
      <div>
        <p className="input-header">Project Code</p>
        <input
          type="text"
          className="project-input"
          list="projectCode"
          value={projectCodeValue}
          disabled={filled}
          onChange={(event) => setProjectCodeValue(event.target.value)}
        />
        <datalist id="projectCode">
          {projectCode.map((projectCode) => (
            <option value={projectCode}>{projectCode}</option>
          ))}
        </datalist>
      </div>
      <div>
        <p className="input-header">Job Code</p>
        <input
          type="text"
          className="project-input"
          list="jobCode"
          disabled={filled}
          value={jobCodeValue}
          onChange={(event) => setJobCodeValue(event.target.value)}
        />
        <datalist id="jobCode">
          {jobCode.map((jobCode) => (
            <option value={jobCode}>{jobCode}</option>
          ))}
        </datalist>
      </div>
      {listDateInput()}
      <div>
        <p className="input-header">Total</p>
        <p className="total-input">{getTotal()}</p>
      </div>
      <div
        className="delete-wrapper"
        onClick={() => deleteRow()}
        style={{ display: filled ? "none" : "" }}
      >
        <img src={cross} className="delete-icon" />
      </div>
    </div>
  );
};

export default TimeCard;
