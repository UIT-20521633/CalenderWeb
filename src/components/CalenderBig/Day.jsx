import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CardEventSmall from "../CardEvent/CardEventSmall";
import ModalCreateEvent from "../Modal/ModalCreate";
import ModalDay from "../Modal/ModalDay";
import { selectEvents } from "../../redux/Events/EventSlice";

const Day = ({ day }) => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);

  // Check if the current day is today
  const isToday = day.isSame(new Date(), "day");

  // Filter events for the selected day
  const eventsDay = events.filter((event) => {
    const eventDate = dayjs(event.create_at).startOf("day");
    const dayStart = day.startOf("day");
    return dayStart.isSame(eventDate, "day");
  });

  // Track the modal state and the button clicked
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null); // Track selected event for modal

  const handleOpen = (event) => {
    setOpen(true);
    setSelectedEvent(event); // Set the selected event for modal
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null); // Reset selected event when modal is closed
  };

  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDay = () => {
    setAnchorEl(null); // Close the "more" button modal
  };

  const checkEvent = events.some((event) => {
    const eventDate = dayjs(event.create_at).startOf("day");
    const dayStart = day.startOf("day");
    return dayStart.isSame(eventDate, "day");
  });

  return (
    <Box className="boder border-gray-200 flex flex-col items-center">
      {/* cho ngày hiển thị */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: checkEvent ? "#E4F6ED" : "transparent",
        }}>
        {/* ngày */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => handleOpen()}>
          <Box
            sx={{
              borderRadius: "50%",
              width: "25px",
              height: "25px",
              mt: "5px",
              padding: "5px",
              backgroundColor: isToday ? "#5684AE" : "transparent",
              color: day.isSame(new Date(), "day") ? "white" : "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "6px",
            }}>
            <p className="text-center">{day.format("DD")}</p>
          </Box>
        </Box>

        {/* sự kiện */}
        {checkEvent && (
          <Box
            className="flex flex-col items-center "
            sx={{ width: "98%", zIndex: 1000 }}>
            {eventsDay.map((event, idx) =>
              idx <= 1 ? (
                <CardEventSmall key={event.id} eventInfo={event} />
              ) : idx === 2 ? (
                <>
                  <Button
                    onClick={(e) => handleClickMore(e)}
                    key={idx}
                    sx={{
                      textTransform: "none",
                      padding: "0px",
                      mt: 1,
                      pr: 7,
                      fontSize: "11px",
                      fontWeight: "400",
                      color: "#5684AE",
                    }}>
                    {eventsDay.length - 2} more
                  </Button>
                  <ModalDay
                    isToday={isToday}
                    day={day}
                    eventsDay={eventsDay}
                    anchorEl={anchorEl}
                    handleClose={handleCloseDay}
                  />
                </>
              ) : null
            )}
          </Box>
        )}
      </Box>

      {/* Modal tạo sự kiện */}
      <ModalCreateEvent
        open={open}
        close={handleClose}
        day={day}
        eventInfo={selectedEvent} // Chuyển thông tin sự kiện khi mở modal
      />
    </Box>
  );
};

export default Day;
