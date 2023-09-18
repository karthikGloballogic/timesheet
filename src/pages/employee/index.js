import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import WeekPicker from "../../components/weekPicker";
import TimeCard from "../../components/timeCard";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../store/features/users";

import clock from "../../assets/images/clock.png";
import "./index.css";
import {
  getDisplayTypeForFilledData,
  getTotalHours,
  validateData,
} from "../../common/commonFunctions";
import { makeRequest } from "../../network";

let tempCount = 2;
const Employee = () => {
  const [weekSelected, setWeekSelected] = useState("");
  const [rows, setRows] = useState([0, 1]);
  const [hourData, setHourData] = useState([]);
  const [user, setUser] = useState("Chavan Karthik");
  const [isFilledDataAvailable, setIsFilledDataAvailable] = useState([]);
  const [totalHours, setTotalHours] = useState([]);
  const [status, setStatus] = useState("pending");
  // const [state, setState] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state.timesheet);

  const getWeekList = async () => {
    const result = await makeRequest("weeks");
    // setState(result);
    // console.log(result, "result from get api");
  };

  const handleAddRow = () => {
    if (rows.length < 3) {
      setRows([...rows, tempCount]);
      tempCount += 1;
    } else {
      alert("Max 3 projects are allowed");
    }
  };

  const deleteRow = (id) => {
    if (rows.length > 1) {
      let temp = [...rows];
      temp.splice(id, 1);
      setRows(temp);
      setHourData((prev) => {
        return prev.filter((_, index) => index !== id);
      });
    } else {
      alert("Minimum one project is required");
    }
  };

  const setTimeCardDetails = (val, i) => {
    let temp = [...hourData];
    let tempTotalHours = [...totalHours];
    tempTotalHours[i] = val.totalHoursLogged;
    setTotalHours(tempTotalHours);
    if (val.projectCode || val.jobCode || val.totalHoursLogged > 0) {
      temp[i] = val;
      setHourData(temp);
    }
  };

  const clearInputs = () => {
    setIsFilledDataAvailable([]);
    setHourData([]);
    setRows([0, 1]);
    setTotalHours([]);
    setStatus("");
  };

  useEffect(() => {
    // Call Api
    // getWeekList();
  }, []);

  console.log(state, "state");

  useEffect(() => {
    const weekIndex = state?.findIndex((week) => week.week === weekSelected);

    if (weekIndex !== -1) {
      // Find the matching user in the week's users
      const userIndex = state[weekIndex].users.findIndex(
        (userData) => userData.username === user
      );

      if (userIndex !== -1) {
        // User's data is available for the selected week
        let userLoggedData = state[weekIndex]?.users[userIndex].userLoggedData;
        let status = state[weekIndex]?.users[userIndex]?.status;
        // console.log(status, "status", userLoggedData);
        setTotalHours(() => {
          return userLoggedData.map((val) => val?.totalHoursLogged);
        });
        setStatus(status);
        setRows(userLoggedData);
        setIsFilledDataAvailable(userLoggedData);
      } else {
        clearInputs();
      }
    } else {
      clearInputs();
    }
  }, [user, weekSelected, state]);

  const handleSubmit = async () => {
    if (validateData(hourData)) {
      const payload = {
        week: weekSelected,
        users: {
          username: user,
          userLoggedData: hourData,
          totalHours: getTotalHours(totalHours),
        },
      };
      dispatch(add(payload));
      const result = await makeRequest("weeks", "POST", payload);
      console.log(result, "results from api");
      navigate("/");
    }
  };

  return (
    <div className="employee-container">
      <Header title="Time Entries" type="employee" onChange={setUser} />

      {/* Body */}
      <div className="employee-options-settings">
        {/* Date Picker */}
        <div className="header-left">
          <WeekPicker onChange={setWeekSelected} />
          <div className="total-hours-container">
            <img src={clock} />
            <div>
              <p className="total-hours">{getTotalHours(totalHours)}h</p>
              <p className="total-hours-subheading">Total Hours Logged</p>
            </div>
          </div>
        </div>
        <Button
          title="Submit"
          onClick={handleSubmit}
          style={{
            display: getDisplayTypeForFilledData(
              isFilledDataAvailable,
              status,
              "string"
            ),
          }}
        />
      </div>
      <div className="timesheet-container">
        {rows.map((row, i) => (
          <TimeCard
            key={i + row}
            duration={weekSelected}
            deleteRow={() => deleteRow(i)}
            user={user}
            status={status}
            filled={getDisplayTypeForFilledData(
              isFilledDataAvailable,
              status,
              "boolean"
            )}
            filledData={isFilledDataAvailable[i]}
            onChange={(val) => setTimeCardDetails(val, i)}
          />
        ))}
      </div>
      <Button
        title="Add Row"
        type="bare"
        background="white"
        style={{
          marginTop: "15px",
          color: "black",
          display: getDisplayTypeForFilledData(
            isFilledDataAvailable,
            status,
            "string"
          ),
        }}
        onClick={handleAddRow}
      />
    </div>
  );
};

export default Employee;
