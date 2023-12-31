import React, { useEffect, useState } from "react";
import "./index.css";
import Header from "../../components/header";
import WeekPicker from "../../components/weekPicker";
import Button from "../../components/button";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/features/users";
import { useNavigate } from "react-router-dom";
import { makeRequest } from "../../network";

const Manager = () => {
  const [weekSelected, setWeekSelected] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  // const [state, setState] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.timesheet);

  const navigate = useNavigate();

  // const getWeekList = async () => {
  //   const result = await makeRequest("weeks");
  //   setState(result);
  //   // console.log(result, "result from get api");
  // };

  const handleStatus = async (data) => {
    const result = await makeRequest("updateWeekUsers", "POST", data);
    console.log("handle result for status", result);
    // getWeekList();
  };

  // useEffect(() => getWeekList, []);

  useEffect(() => {
    let tempData = state.find((val) => val.week === weekSelected);

    // let filteredData = tempData?.users?.filter(
    //   (val) => !val.hasOwnProperty("status")
    // );
    let filteredData = tempData?.users?.filter((val) => {
      console.log(val.selected, "check status");
      if (val.status === "rejected" || val.status === null) return true;
      return false;
    });
    setTableData(filteredData);
  }, [state, weekSelected]);

  const handleCheckboxChange = (id, val) => {
    let updatedData = [...tableData];
    updatedData[id] = {
      ...updatedData[id],
      selected: val.target.checked,
    };
    // item.id === id ? { ...item, selected: !item?.selected || true } : item

    setTableData(updatedData);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    const updatedData = tableData.map((item) => ({
      ...item,
      selected: !selectAll,
    }));
    setTableData(updatedData);
    setSelectAll(!selectAll);
  };

  const validateSelect = () => {
    return tableData?.some((val) => val?.selected === true);
  };

  const handleApproveReject = (type) => {
    console.log(validateSelect());
    if (!validateSelect()) {
      alert("Please select one to approve or reject");
      return;
    }

    const updatedData = tableData.map((val) => {
      if (val.selected === true) {
        return { ...val, status: type };
      } else {
        return val;
      }
    });

    const notSelected = tableData.filter((val) => val?.selected !== true);

    const payload = {
      week: weekSelected,
      users: updatedData,
    };
    dispatch(update(payload));
    handleStatus(payload);
    setTableData((prev) => {
      return prev.filter((val) => val.selected === null);
    });
    setSelectAll(false);
  };

  console.log(tableData, "tableData");

  return (
    <div className="manager-container">
      <Header title="Manager Approval" type="manager" />

      {/* Body */}
      <div className="employee-options-settings">
        {/* Date Picker */}
        <WeekPicker onChange={setWeekSelected} />
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

      <div className="table-container">
        <table>
          {/* <thead> */}
          <tr>
            <th>
              <input
                className="checkbox"
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Project Code</th>
            <th>Total Hours</th>
            <th>View Details</th>
            <th>Comments</th>
          </tr>
          {/* </thead> */}
          {/* <tbody> */}
          {tableData?.map((val, i) => {
            return (
              <tr style={{ marginLeft: "200px" }} key={i}>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={val?.selected || undefined}
                    onChange={(event) => handleCheckboxChange(i, event)}
                  />
                </td>
                <td>{i}</td>
                <td>{val?.username}</td>
                <td>{val?.userLoggedData[0]?.projectCode}</td>
                <td>{val?.totalHours}</td>
                <td>
                  <button
                    className="table-button"
                    onClick={() =>
                      navigate("/viewDetails", {
                        state: {
                          week: weekSelected,
                          user: tableData[i],
                          userIndex: i,
                        },
                      })
                    }
                  >
                    View
                  </button>
                </td>
                <td>
                  <input
                    type="text"
                    className="comment"
                    placeholder="Comment"
                  />
                </td>
              </tr>
            );
          })}
          {/* </tbody> */}
        </table>
      </div>
    </div>
  );
};

export default Manager;
