import React, { useState, useRef, useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../../common/hooks/useDectOutsideClick";
import user from "../../assets/images/user.png";
import dropdownWhite from "../../assets/images/dropdownWhite.png";
import logout from "../../assets/images/logout.png";
import "./index.css";
import { useSelector } from "react-redux";

const Header = (props) => {
  const { title, type, onChange } = props;
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("Chavan Karthik");
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const options = useSelector((state) => state.employeeList);

  const onClick = (e) => {
    e.stopPropagation();
    console.log(isActive);

    setIsActive(!isActive);
  };

  const activate = () => {
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

  const handleKeyPress = (event, callback) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  return (
    <header>
      <p>{title}</p>
      <div className="right-header">
        <div className="userSelect-container">
          <div className="user-pic">
            <img src={user} alt="User Icon" />
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
              onKeyDown={(event) => handleKeyPress(event, activate)}
              role="button"
              aria-expanded={isActive}
              tabIndex={0}
            >
              <span className="userName" tabIndex={-1}>
                {selectedOption}
              </span>
              <img
                src={dropdownWhite}
                className="user-dropdown-icon"
                alt="Dropdown Icon"
              />
            </div>
          )}
          {type === "manager" && <span className="userName">Manager</span>}
          <div
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
            tabIndex={0}
          >
            {options.map((val, index) => {
              return (
                <span
                  key={index}
                  className="user-list"
                  onClick={() => handleOptionChange(val?.name)}
                  onKeyPress={(event) =>
                    handleKeyPress(event, () => handleOptionChange(val?.name))
                  }
                  role="button"
                  tabIndex={0}
                >
                  {val?.name}
                </span>
              );
            })}
          </div>
          {/* Logout */}
          <div
            className="logout"
            onClick={navigateToHome}
            onKeyPress={(event) => handleKeyPress(event, navigateToHome)}
            role="button"
            tabIndex={0}
          >
            <img src={logout} alt="Logout Icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
