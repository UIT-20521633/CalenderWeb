import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { getMonth } from "../../utils/daymatrix";

const initialState = {
  events: [],
  daySeclect: null,
};

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    updateEvent: (state, action) => {
      state.events = state.events.map((event) =>
        event.id === action.payload.id ? action.payload : event
      );
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setDaySelect: (state, action) => {
      state.daySeclect = action.payload;
    },
  },
});

export const { addEvent, removeEvent, updateEvent, setEvents, setDaySelect } =
  eventSlice.actions;

export const selectEvents = (state) => state.events.events;
export const selectDaySelect = (state) => state.events.daySeclect;
export const eventReducer = eventSlice.reducer;
