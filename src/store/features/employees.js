// employeesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: [], // Initial state should be an array of employees
  reducers: {
    setEmployees: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
