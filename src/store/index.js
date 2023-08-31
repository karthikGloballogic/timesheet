import { configureStore } from "@reduxjs/toolkit";
import timeSheetSlice from "./features/users";

const store = configureStore({
  reducer: timeSheetSlice,
});

export default store;
