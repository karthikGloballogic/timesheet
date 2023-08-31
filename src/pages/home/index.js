import React from "react";
import { useNavigate } from "react-router-dom";
import timeSheet from "../../assets/images/home.jpg";
import managerImage from "../../assets/images/manager.png";
import employeeImage from "../../assets/images/employee.png";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();

  const navigateToEmployee = () => {
    navigate("/employee");
  };

  const navigateToManager = () => {
    navigate("/manager");
  };

  return (
    <div className="home-container">
      {/* Side Image */}
      <div className="homePage-image-div">
        <img src={timeSheet} className="homePage-image" />
      </div>

      {/* Users Select */}
      <div className="user-select-div">
        <h2>Select User</h2>
        <div className="user" onClick={navigateToManager}>
          <img src={managerImage} className="user-image" />
          <p>Manager</p>
        </div>
        <div
          className="user"
          style={{ background: "rgba(70, 59, 200, 0.19)" }}
          onClick={navigateToEmployee}
        >
          <img src={employeeImage} className="user-image" />
          <p>Employee</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
