import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./studentSlice";
import teacherSlice from "./teacherSlice";

const store = configureStore({
  reducer: {
    studentData: studentSlice,
    teacherData: teacherSlice,
  },
});

export default store;
