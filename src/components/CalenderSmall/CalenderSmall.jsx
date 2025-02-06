import CalenderHeader from "./CalenderHeader";
import Month from "./Month";
import { getMonth } from "../../utils/daymatrix";
import Box from "@mui/material/Box";
const CalenderSmall = () => {
  return (
    <Box
      className="flex flex-1 flex-col "
      sx={{
        borderBottom: "3px solid #e0e0e0",
        py: "10px",
        px: "40px",
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
            className="flex justify-center items-center mb-1"
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

export default CalenderSmall;
