import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentDetails: [],
  },
  reducers: {
    addStudent: (state, action) => {
      state.studentDetails = [...state.studentDetails, action.payload];
    },
    removeStudent: (state, action) => {
      let filterData = state.studentDetails.filter(
        (item, i) => i !== action.payload
      );
      state.studentDetails = filterData;
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;

export default studentSlice.reducer;
