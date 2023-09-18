import { configureStore, combineReducers } from "@reduxjs/toolkit";

import timeSheetSlice from "./features/users";
import jobCodeSlice from "./features/jobCode";
import projectCodeSlice from "./features/projectCode";
import employeeSlice from "./features/employees";

const rootReducer = combineReducers({
  timesheet: timeSheetSlice,
  jobCodes: jobCodeSlice,
  projectCodes: projectCodeSlice,
  employeeList: employeeSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
