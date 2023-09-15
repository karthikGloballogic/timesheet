import { createSlice } from "@reduxjs/toolkit";

const timeSheetSlice = createSlice({
  name: "timesheet",
  initialState: [], // Initial state should be an array of time sheet data
  reducers: {
    add: (state, action) => {
      console.log(action, "action of store");
      if (action.payload.length > 0) {
        return action.payload;
      }
      // const existingWeekIndex = state.findIndex(
      //   (week) => week.week === action.payload.week
      // );

      // if (existingWeekIndex !== -1) {
      //   // If the week already exists, update the userLoggedData for the specific user
      //   state[existingWeekIndex].users.push(action.payload.users);
      // } else {
      //   // If the week doesn't exist, add a new week entry
      //   state.push({
      //     week: action.payload.week,
      //     users: [action.payload.users],
      //   });
      // }
    },
    update: (state, action) => {
      const getIndex = state.findIndex(
        (week) => week.week === action.payload.week
      );
      if (getIndex !== -1) {
        state[getIndex] = action.payload;
      }
    },
    updateUser: (state, action) => {
      const getIndex = state.findIndex(
        (week) => week.week === action.payload.week
      );
      console.log(state, "state.users");
      const getNameIndex = state[getIndex]?.users.findIndex(
        (val) => val.username === action.payload.userIndex
      );
      if (getIndex !== -1 && getNameIndex !== -1) {
        state[getIndex].users[getNameIndex] = action.payload.userData;
      }
    },
    // You can add an update action if needed
  },
});

export const { add, update, updateUser } = timeSheetSlice.actions;
export default timeSheetSlice.reducer;
