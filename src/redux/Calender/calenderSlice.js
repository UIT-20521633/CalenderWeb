import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getMonth } from "../../utils/daymatrix";

const initialState = {
  monthIndex: 0,
  monthIndexSmall: 0,
  currentMonth: [],
  currentMonthSmall: [],
};

export const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {
    increaseMonth: (state) => {
      if (state.monthIndex === state.monthIndexSmall) {
        state.monthIndex += 1;
        state.monthIndexSmall += 1;
        state.currentMonth = getMonth(state.monthIndex);
        state.currentMonthSmall = getMonth(state.monthIndex);
      } else {
        state.monthIndexSmall = state.monthIndex;
        state.monthIndex += 1;
        state.monthIndexSmall += 1;
        state.currentMonth = getMonth(state.monthIndex);
        state.currentMonthSmall = getMonth(state.monthIndex);
      }
    },
    decreaseMonth: (state) => {
      if (state.monthIndex === state.monthIndexSmall) {
        state.monthIndex -= 1;
        state.monthIndexSmall -= 1;
        state.currentMonth = getMonth(state.monthIndex);
        state.currentMonthSmall = getMonth(state.monthIndex);
      } else {
        state.monthIndexSmall = state.monthIndex;
        state.monthIndex -= 1;
        state.monthIndexSmall -= 1;
        state.currentMonth = getMonth(state.monthIndex);
        state.currentMonthSmall = getMonth(state.monthIndex);
      }
    },
    incrementByCalenderSmall: (state) => {
      state.monthIndexSmall += 1;
      state.currentMonthSmall = getMonth(state.monthIndexSmall);
    },
    decrementByCalenderSmall: (state) => {
      state.monthIndexSmall -= 1;
      state.currentMonthSmall = getMonth(state.monthIndexSmall);
    },
    setMonthIndex: (state, action) => {
      state.monthIndex = action.payload;
      state.currentMonth = getMonth(state.monthIndex);
    },
    setMonthIndexSmall: (state, action) => {
      state.monthIndexSmall = action.payload;
      state.currentMonthSmall = getMonth(state.monthIndexSmall);
    },
  },
});

// Selectors
export const selectMonthIndex = (state) => state.calender.monthIndex;
export const selectMonthIndexSmall = (state) => state.calender.monthIndexSmall;
export const selectMonthCurrent = (state) => state.calender.currentMonth;
export const selectMonthCurrentSmall = (state) =>
  state.calender.currentMonthSmall;
export const {
  increaseMonth,
  decreaseMonth,
  setMonthIndex,
  incrementByCalenderSmall,
  decrementByCalenderSmall,
  setMonthIndexSmall,
} = calenderSlice.actions;
export const calenderReducer = calenderSlice.reducer;
