import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import timeSheet from "../../assets/images/home.jpg";
import managerImage from "../../assets/images/manager.png";
import employeeImage from "../../assets/images/employee.png";
import "./index.css";
import { fetchAllData } from "../../network/fetchAll";
import { useDispatch } from "react-redux";

const Home = ({ match }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllData()); // Assuming you're using Redux and dispatching the fetchAllData action
  }, [dispatch]);

  const navigateToEmployee = () => {
    navigate("/employee");
  };

  const navigateToManager = () => {
    navigate("/manager");
  };

  // Handle Enter key press
  const handleKeyPress = (event, callback) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  return (
    <div className="home-container">
      {/* Side Image */}
      <div className="homePage-image-div">
        <img src={timeSheet} className="homePage-image" alt="Time Sheet" />
      </div>

      {/* Users Select */}
      <div className="user-select-div">
        <h2>Select User</h2>
        <div
          className="user"
          onClick={() => navigateToManager()}
          onKeyPress={(event) => handleKeyPress(event, navigateToManager)}
          role="button"
          tabIndex={0}
          aria-label="Select Manager"
        >
          <img
            src={managerImage}
            className="user-image"
            alt="Manager Icon"
            aria-hidden="true"
          />
          <p>Manager</p>
        </div>
        <div
          className="user"
          style={{ background: "rgba(70, 59, 200, 0.19)" }}
          onClick={() => navigateToEmployee()}
          onKeyPress={(event) => handleKeyPress(event, navigateToEmployee)}
          role="button"
          tabIndex={0}
          aria-label="Select Employee"
        >
          <img
            src={employeeImage}
            className="user-image"
            alt="Employee Icon"
            aria-hidden="true"
          />
          <p>Employee</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
