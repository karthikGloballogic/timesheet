import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header";
import WeekPicker from "../../components/weekPicker";
import "./index.css";
import TimeCard from "../../components/timeCard";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../../store/features/users";
import clock from "../../assets/images/clock.png";

let tempCount = 2;
const Employee = () => {
  const [weekSelected, setWeekSelected] = useState("");
  const [rows, setRows] = useState([0, 1]);
  const [hourData, setHourData] = useState([]);
  const [user, setUser] = useState("Chavan Karthik");
  const [isFilledDataAvailable, setIsFilledDataAvailable] = useState([]);
  const [totalHours, setTotalHours] = useState([]);
  const [status, setStatus] = useState("pending");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

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

  // useEffect(() => {
  //   // To clear the inputs
  //   setHourData([]);
  //   setTotalHours([]);
  // }, [user]);

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

  const getTotalHours = () => {
    let sum = 0;
    for (let i = 0; i < totalHours.length; i++) {
      if (totalHours[i]) sum += totalHours[i];
    }
    return sum;
  };

  const validateData = () => {
    if (hourData.length === 0) {
      alert("At least one time card must be filled.");
      return false;
    }

    for (const timeCard of hourData) {
      if (timeCard.totalHoursLogged > 0) {
        if (!timeCard.projectCode || !timeCard.jobCode) {
          alert("Project code and job code must be provided for entries");
          return false;
        }
      } else {
        alert("Please log the hours for the project", timeCard.projectCode);
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const weekIndex = state.findIndex((week) => week.week === weekSelected);

    if (weekIndex !== -1) {
      // Find the matching user in the week's users
      const userIndex = state[weekIndex].users.findIndex(
        (userData) => userData.username === user
      );

      if (userIndex !== -1) {
        // User's data is available for the selected week
        let userLoggedData = state[weekIndex]?.users[userIndex].userLoggedData;
        let status = state[weekIndex]?.users[userIndex]?.status;
        console.log(status, "status", userLoggedData);
        setStatus(status);
        setRows(userLoggedData);
        setIsFilledDataAvailable(userLoggedData);
      } else {
        setIsFilledDataAvailable([]);
        setHourData([]);
        setRows([0, 1]);
        setTotalHours([]);
        setStatus("");
      }
    } else {
      setIsFilledDataAvailable([]);
      setHourData([]);
      setRows([0, 1]);
      setTotalHours([]);
      setStatus("");
    }
  }, [user, weekSelected]);

  const handleSubmit = () => {
    if (validateData()) {
      const payload = {
        week: weekSelected,
        data: {
          username: user,
          userLoggedData: hourData,
          totalHours: getTotalHours(),
        },
      };
      dispatch(add(payload));
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
              <p className="total-hours">{getTotalHours()}h</p>
              <p className="total-hours-subheading">Total Hours Logged</p>
            </div>
          </div>
        </div>
        <Button
          title="Submit"
          onClick={handleSubmit}
          style={{
            display:
              isFilledDataAvailable.length > 0 && status !== "rejected"
                ? "none"
                : "",
          }}
        />
      </div>
      <div className="timesheet-container">
        {rows.map((row, i) => (
          <TimeCard
            key={row}
            duration={weekSelected}
            deleteRow={() => deleteRow(i)}
            user={user}
            status={status}
            filled={
              isFilledDataAvailable.length > 0 && status !== "rejected"
                ? true
                : false
            }
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
          display:
            isFilledDataAvailable.length > 0 && status !== "rejected"
              ? "none"
              : "",
        }}
        onClick={handleAddRow}
      />
    </div>
  );
};

export default Employee;
