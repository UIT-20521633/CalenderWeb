import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardUpComeEvent from "../CardEvent/CardUpComeEvent";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { selectDaySelect } from "../../redux/Day/DaySlice";
import { selectEvents } from "../../redux/Events/EventSlice";
const UpcomEvent = () => {
  const events = useSelector(selectEvents);
  const daySelect = useSelector(selectDaySelect);
  // Kiểm tra nếu `daySelect` có giá trị hợp lệ
  const eventsDay = events.filter((event) => {
    if (!daySelect) return false;
    const eventDate = dayjs(event.create_at).startOf("day");
    const dayStart = dayjs(daySelect).startOf("day");
    return dayStart.isSame(eventDate, "day");
  });
  const formattedDate = daySelect
    ? dayjs(daySelect).isSame(dayjs(), "day")
      ? `Today, ${dayjs(daySelect).format("D MMM")}` // Nếu là ngày hôm nay, hiển thị "Today"
      : dayjs(daySelect).format("dddd, D MMM") // Nếu không phải hôm nay, hiển thị "Monday, 4 Apr"
    : "No day selected"; // Nếu không có ngày chọn, hiển thị "No day selected"
  return (
    <Box sx={{ px: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box
          sx={{
            fontSize: "20px",
            fontWeight: "600",
            color: "#092C54",
          }}>
          Upcoming Events
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5684AE",
            color: "white",
            textTransform: "none",
            borderRadius: "20px",
            padding: "5px 15px",
            fontSize: "12px",
            fontWeight: "600",
            "&:hover": {
              backgroundColor: "#092C54",
            },
          }}>
          View All
        </Button>
      </Box>
      <Box
        sx={{
          color: "#54585D",
          fontSize: "16px",
          fontWeight: "600",
          my: 1,
        }}>
        {formattedDate}
      </Box>
      <Box
        sx={{
          overflowY: "auto",
          height: "180px",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#5684AE",
            borderRadius: "24px",
          },
        }}>
        {eventsDay.length > 0 ? (
          eventsDay.map((event, idx) => (
            <CardUpComeEvent key={idx} eventInfo={event} />
          ))
        ) : (
          <Box
            sx={{
              textAlign: "center",
              mt: 2,
              fontSize: "14px",
              fontWeight: "600",
              color: "#54585D",
            }}>
            No upcoming events
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UpcomEvent;
