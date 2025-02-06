import { useState } from "react";
import CalenderHeader from "./CalenderHeader";
import Month from "./Month";
import Box from "@mui/material/Box";
const CalenderBig = () => {
  return (
    <Box
      className="flex flex-1 flex-col "
      sx={{
        backgroundColor: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        width: "80%",
        height: "95vh",
      }}>
      <div className="my-4">
        <CalenderHeader />
      </div>
      <Box className="grid grid-cols-7 grid-rows-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
          <Box
            sx={{
              color: "#676767",
            }}
            className="flex justify-center items-center mb-2"
            key={i}>
            <p>{day}</p>
          </Box>
        ))}
      </Box>
      <div className="flex flex-1">
        <Month />
      </div>
    </Box>
  );
};

export default CalenderBig;
