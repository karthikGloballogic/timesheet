// projectCodeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const projectCodeSlice = createSlice({
  name: "projectCode",
  initialState: [], // Initial state should be an array of project codes
  reducers: {
    setProjectCodes: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProjectCodes } = projectCodeSlice.actions;
export default projectCodeSlice.reducer;
