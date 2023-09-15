// jobCodeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const jobCodeSlice = createSlice({
  name: "jobCode",
  initialState: [], // Initial state should be an array of job codes
  reducers: {
    setJobCodes: (state, action) => {
      return action.payload;
    },
  },
});

export const { setJobCodes } = jobCodeSlice.actions;
export default jobCodeSlice.reducer;
