import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CardEventSmall from "../CardEvent/CardEventSmall";
const ModalDay = ({ isToday, day, eventsDay, anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorPosition={{ top: 0, left: 400 }}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      sx={{
        borderRadius: "20px",
        border: "1px solid #e0e0e0",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}>
      <Box
        sx={{
          width: "140px",
          height: "190px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}>
        {/* ngày */}
        <Box
          sx={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            mt: 2,
            mb: 2,
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
        {/* sự kiện */}
        <Box className="flex flex-col items-center px-1" sx={{ width: "100%" }}>
          {eventsDay.map((event, idx) => (
            <Box key={idx} sx={{ width: "100%" }}>
              <CardEventSmall key={event.id} eventInfo={event} />
            </Box>
          ))}
        </Box>
      </Box>
    </Popover>
  );
};

export default ModalDay;
