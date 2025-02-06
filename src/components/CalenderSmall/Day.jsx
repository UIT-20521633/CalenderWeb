import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "../../style/style.css";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { selectEvents } from "../../redux/Events/EventSlice.js";
import {
  selectDayEvents,
  setDayEvents,
  setDaySelect,
} from "../../redux/Day/DaySlice.js";

const Day = ({ day }) => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  // Handle event selection when clicking on a day
  const handleData = async () => {
    dispatch(setDaySelect(day));
    //lọc toàn bộ sự kiện trong thuộc day đưa vào mảng eventsDay
    const eventsDay = events.filter((event) => {
      const eventDate = dayjs(event.create_at).startOf("day");
      const dayStart = day.startOf("day");
      return dayStart.isSame(eventDate, "day");
    });
    //dispatch mảng eventsDay vào redux
    dispatch(setDayEvents(eventsDay));
  };
  // Check if the current day is today
  const isToday = day.isSame(new Date(), "day");
  const checkEvent = events.some((event) => {
    const eventDate = dayjs(event.create_at).startOf("day");
    const dayStart = day.startOf("day");
    return dayStart.isSame(eventDate, "day");
  });
  return (
    <Button
      className="boder border-gray-200 flex flex-col items-center"
      onClick={handleData}>
      <Box
        sx={{
          width: "100%",
          borderRadius: "50%",
          height: "100%",
          display: "flex",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          py: "6px",
          px: "4px",
        }}>
        <Box
          sx={{
            borderRadius: "50%",
            fontSize: "12px",
            width: "25px",
            height: "25px",
            padding: "5px",
            backgroundColor: checkEvent ? "#FFE4C8" : "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Box
            sx={{
              borderRadius: "50%",
              fontSize: "12px",
              width: "25px",
              height: "25px",
              padding: "5px",
              backgroundColor: isToday ? "#5684AE" : "transparent", // Highlight today's date
              color: isToday ? "white" : "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <p className="text-center">{day.format("DD")}</p>
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

export default Day;
