import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dayEvents: [],
  daySelect: null,
};

export const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    setDayEvents: (state, action) => {
      state.dayEvents = action.payload;
    },
    setDaySelect: (state, action) => {
      state.daySelect = action.payload;
    },
  },
});

export const { setDayEvents, setDaySelect } = daySlice.actions;

export const selectDayEvents = (state) => state.day.dayEvents;
export const selectDaySelect = (state) => state.day.daySelect;
export const dayReducer = daySlice.reducer;
