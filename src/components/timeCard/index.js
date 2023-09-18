import React, { useState, useEffect, useRef } from "react";
import cross from "../../assets/images/cross.png";
import generateFormattedDateArray from "../../common/commonFunctions/generateWeekDates";

import "./index.css";
import AutocompleteInput from "../autoComplete";
import { makeRequest } from "../../network";
import { useSelector } from "react-redux";

// const projectCode = ["WFS_1101", "WFS_1102"];
// const jobCode = [
//   "Dev-Analysis",
//   "Dev-Implementation",
//   "Dev-UnitTesting",
//   "Dev-CodeReview",
//   "RequirementGathering",
//   "RequirementAnalysis",
//   "TestCase-Writing",
//   "TestCase-Execution",
//   "TestCase-Automation",
// ];

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
  const [projectCode, setProjectCode] = useState([]);
  const [jobCode, setJobCode] = useState([]);
  const [weekData, setWeekData] = useState(
    filledData?.hourlyData || Array(7).fill(inputDefault)
  );
  const [projectCodeValue, setProjectCodeValue] = useState(
    filledData?.projectCode
  );
  const [jobCodeValue, setJobCodeValue] = useState(filledData?.jobCode || "");
  const inputRefs = useRef([]);
  const { jobCodes, projectCodes } = useSelector((state) => state);

  let week = generateFormattedDateArray(duration);

  const getJobCodeProjectCode = async () => {
    setJobCode(jobCodes);
    setProjectCode(projectCodes);
  };

  useEffect(() => {
    getJobCodeProjectCode();
    inputRefs.current = Array(7)
      .fill(null)
      .map(() => React.createRef());
  }, []);

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
    for (let i = 0; i < weekData.length; i++) {
      if (weekData[i]) sum += weekData[i];
    }
    return sum;
  };

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
          aria-label={`Hours for ${day}`}
          defaultValue={
            filled || status === "rejected"
              ? filledData.hourlyData[i]
              : undefined
          }
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
        <AutocompleteInput
          data={projectCode}
          disabled={filled}
          onChange={setProjectCodeValue}
          defaultValue={projectCodeValue}
          label="Project Code"
        />
      </div>
      <div>
        <p className="input-header">Job Code</p>
        <AutocompleteInput
          data={jobCode}
          disabled={filled}
          onChange={setJobCodeValue}
          defaultValue={jobCodeValue}
          label="Job Code"
        />
      </div>
      {listDateInput()}
      <div>
        <p className="input-header">Total</p>
        <p className="total-input">{getTotal()}</p>
      </div>
      <div
        className="delete-wrapper"
        onClick={() => deleteRow()}
        tabIndex={0}
        role="button"
        aria-label="Delete Row"
        style={{ display: filled ? "none" : "" }}
      >
        <img src={cross} className="delete-icon" alt="Delete Row Icon" />
      </div>
    </div>
  );
};

export default TimeCard;
