import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user from "../../assets/images/user.png";
import clock from "../../assets/images/clock.png";
import Header from "../../components/header";
import "./index.css";
import Button from "../../components/button";
import TimeCard from "../../components/timeCard";
import { updateUser } from "../../store/features/users";
import { useDispatch, useSelector } from "react-redux";

const ViewDetails = () => {
  const { state } = useLocation();
  console.log(state, "props");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleApproveReject = (type) => {
    let updatedData = { ...state?.user, status: type };
    dispatch(
      updateUser({
        week: state.week,
        userIndex: state?.user?.username,
        userData: updatedData,
      })
    );
    navigate(-1);
  };

  return (
    <div className="details-container">
      <Header title="Manager Approval" type="manager" />

      {/* Body */}
      <div className="employee-options-settings">
        <div className="header-left">
          <div className="selected-week">
            <p>Selected Week</p>
            <span className="dateName">{state?.week}</span>
          </div>
          <div className="user-viewDetails">
            <div className="user-pic" style={{ width: "40px", height: "40px" }}>
              <img src={user} style={{ height: "5vmin" }} />
            </div>
            <p>{state?.user?.username}</p>
          </div>
          <div className="total-hours-container">
            <img src={clock} />
            <div>
              <p className="total-hours">{state?.user?.totalHours}h</p>
              <p className="total-hours-subheading">Total Hours Logged</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            title="Approve"
            onClick={() => handleApproveReject("approved")}
          />
          <Button
            title="Reject"
            background={"#F8736B"}
            style={{ marginLeft: "30px" }}
            onClick={() => handleApproveReject("rejected")}
          />
        </div>
      </div>

      {/* Time Card */}
      <div className="timesheet-container">
        {state?.user?.userLoggedData?.map((row, i) => (
          <TimeCard
            key={i}
            duration={row?.week}
            // deleteRow={() => deleteRow(i)}
            user={state?.user?.username}
            filled={true}
            filledData={row}
            onChange={(val) => console.log("hello")}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewDetails;
