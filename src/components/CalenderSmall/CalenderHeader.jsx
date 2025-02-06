import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementByCalenderSmall,
  decrementByCalenderSmall,
  selectMonthIndex,
  selectMonthIndexSmall,
} from "../../redux/Calender/calenderSlice";
import dayjs from "dayjs";
const CalenderHeader = () => {
  const monthIndex = useSelector(selectMonthIndexSmall);
  const dispatch = useDispatch();
  const handelIncreaseMonth = () => {
    dispatch(incrementByCalenderSmall());
  };
  const handelDecreaseMonth = () => {
    dispatch(decrementByCalenderSmall());
  };
  return (
    <div>
      {/* calender header */}
      <Box
        className="flex items-center gap-4 justify-center"
        sx={{
          fontWeight: "600",
        }}>
        <IconButton onClick={handelDecreaseMonth}>
          <KeyboardArrowLeftIcon
            sx={{
              color: "#5684AE",
            }}
          />
        </IconButton>
        <Box
          sx={{
            color: "#092C54",
            fontSize: "15px",
          }}>
          {dayjs(new Date(dayjs().year(), monthIndex, 1)).format("MMMM YYYY")}
          {/* {curentMonth && curentMonth[2] && curentMonth[2][2]
            ? curentMonth[2][2].format("MMMM YYYY")
            : "Invalid Date"} */}
        </Box>
        <IconButton onClick={handelIncreaseMonth}>
          <KeyboardArrowRightIcon
            sx={{
              color: "#5684AE",
            }}
          />
        </IconButton>
      </Box>
    </div>
  );
};

export default CalenderHeader;
