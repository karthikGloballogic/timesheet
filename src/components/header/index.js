import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../../common/hooks/useDectOutsideClick";
import user from "../../assets/images/user.png";
import dropdownWhite from "../../assets/images/dropdownWhite.png";
import logout from "../../assets/images/logout.png";
import "./index.css";

const options = [
  { value: "Alex", label: "Alex Ramp" },
  { value: "John", label: "John Due" },
  { value: "Peter", label: "Peter Rog" },
  { value: "Karthik", label: "Chavan Karthik" },
];

const Header = (props) => {
  const { title, type, onChange } = props;
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Chavan Karthik");
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  const handleOptionChange = (event) => {
    onChange(event);
    setSelectedOption(event);
    setIsActive(false);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <header>
      <p>{title}</p>
      <div className="right-header">
        <div className="userSelect-container">
          <div className="user-pic">
            <img src={user} />
          </div>
          {type !== "manager" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "140px",
                cursor: "pointer",
              }}
              onClick={onClick}
            >
              <span className="userName">{selectedOption}</span>
              <img src={dropdownWhite} className="user-dropdown-icon" />
            </div>
          )}
          {type === "manager" && <span className="userName">Manager</span>}
          <div
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            {options.map((val, index) => {
              return (
                <span
                  key={index}
                  className="user-list"
                  onClick={() => handleOptionChange(val.label)}
                >
                  {val.label}
                </span>
              );
            })}
          </div>
          {/* Logout */}
          <div className="logout" onClick={navigateToHome}>
            <img src={logout} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
