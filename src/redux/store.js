import { configureStore } from "@reduxjs/toolkit";
import { calenderReducer } from "./Calender/calenderSlice";
import { eventReducer } from "./Events/EventSlice";
import { dayReducer } from "./Day/DaySlice";

//Khởi tạo Redux Store
export default configureStore({
  reducer: {
    calender: calenderReducer,
    events: eventReducer,
    day: dayReducer,
  },
});
