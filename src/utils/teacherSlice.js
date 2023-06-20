import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherDetails: [],
  },
  reducers: {
    addTeacher: (state, action) => {
      state.teacherDetails = [...state.teacherDetails, action.payload];
    },
    removeTeacher: (state, action) => {
      let filterData = state.teacherDetails.filter(
        (item, i) => i !== action.payload
      );
      state.teacherDetails = filterData;
    },
  },
});

export const { addTeacher, removeTeacher } = teacherSlice.actions;

export default teacherSlice.reducer;
