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

  const dispatch = useDispatch();
  const state = useSelector((state) => state.timesheet);

  const navigate = useNavigate();

  const handleStatus = async (data) => {
    const result = await makeRequest("updateWeekUsers", "POST", data);
    console.log("handle result for status", result);
  };

  useEffect(() => {
    let tempData = state.find((val) => val.week === weekSelected);
    let filteredData = tempData?.users?.filter((val) => {
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
    if (!validateSelect()) {
      alert("Please select at least one to approve or reject.");
      return;
    }

    const updatedData = tableData.map((val) => {
      if (val.selected === true) {
        return { ...val, status: type };
      } else {
        return val;
      }
    });

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

  return (
    <div className="manager-container">
      <Header title="Manager Approval" type="manager" />

      <div className="employee-options-settings">
        <WeekPicker onChange={setWeekSelected} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            title="Approve"
            onClick={() => handleApproveReject("approved")}
          />
          <Button
            title="Reject"
            background={"#ce4941"}
            style={{ marginLeft: "30px" }}
            onClick={() => handleApproveReject("rejected")}
          />
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col" aria-label="Column 1">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  aria-label="Select All"
                />
              </th>
              <th scope="col">Emp ID</th>
              <th scope="col">Name</th>
              <th scope="col">Project Code</th>
              <th scope="col">Total Hours</th>
              <th scope="col">View Details</th>
              <th scope="col">Comments</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((val, i) => {
              return (
                <tr key={i}>
                  <td>
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={val?.selected || false}
                      onChange={(event) => handleCheckboxChange(i, event)}
                      aria-label={`Select for ${val?.username}`}
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
                      aria-label={`View Details for ${val?.username}`}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="comment"
                      placeholder="Comment"
                      aria-label={`Comment for ${val?.username}`}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
