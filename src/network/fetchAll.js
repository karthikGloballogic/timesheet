import { makeRequest } from "./index";
import { add } from "../store/features/users";
import { setEmployees } from "../store/features/employees";
import { setJobCodes } from "../store/features/jobCode";
import { setProjectCodes } from "../store/features/projectCode";

// Define your API endpoints
const apiEndpoints = {
  getWeeks: "weeks",
  getProjectCodes: "project-codes",
  getJobCodes: "job-codes",
  getEmployees: "employees",
  // Add more API endpoints as needed
};

// Create a function to fetch all data and dispatch actions
export const fetchAllData = () => async (dispatch) => {
  console.log("called .....................");
  try {
    // Call the APIs using makeRequest or your preferred API library
    const [weeksData, projectCodesData, jobCodesData, employeesData] =
      await Promise.all([
        makeRequest(apiEndpoints.getWeeks),
        makeRequest(apiEndpoints.getProjectCodes),
        makeRequest(apiEndpoints.getJobCodes),
        makeRequest(apiEndpoints.getEmployees),

        // Add more API calls as needed
      ]);

    // Dispatch actions with the fetched data
    dispatch(add(weeksData)); // Assuming add action adds weeks data to Redux state
    dispatch(setProjectCodes(projectCodesData)); // Assuming update action updates project codes data
    dispatch(setJobCodes(jobCodesData)); // Assuming updateUser action updates job codes data
    dispatch(setEmployees(employeesData));
    // Dispatch more actions as needed for additional data
  } catch (error) {
    // Handle errors if needed
    console.error("Error fetching data:", error);
  }
};
