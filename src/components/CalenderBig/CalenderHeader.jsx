import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseMonth,
  increaseMonth,
  selectMonthIndex,
  setMonthIndex,
  setMonthIndexSmall,
} from "../../redux/Calender/calenderSlice";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";
const CalenderHeader = () => {
  const monthIndex = useSelector(selectMonthIndex);
  const dispatch = useDispatch();
  const handelIncreaseMonth = () => {
    dispatch(increaseMonth());
  };
  const handelDecreaseMonth = () => {
    dispatch(decreaseMonth());
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4">
        {/* calender header */}
        <div className="flex items-center gap-4 ">
          <Button
            onClick={() => {
              dispatch(setMonthIndex(dayjs().month()));
              dispatch(setMonthIndexSmall(dayjs().month()));
            }}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#5684AE",
              borderColor: "#5684AE",
              borderRadius: "15px",
            }}>
            Today
          </Button>
          <IconButton onClick={handelDecreaseMonth}>
            <KeyboardArrowLeftIcon
              sx={{
                color: "#5684AE",
              }}
            />
          </IconButton>
          <IconButton onClick={handelIncreaseMonth}>
            <KeyboardArrowRightIcon
              sx={{
                color: "#5684AE",
              }}
            />
          </IconButton>
          <h6
            style={{
              color: "#092C54",
            }}>
            {dayjs(new Date(dayjs().year(), monthIndex, 1)).format("MMMM YYYY")}
          </h6>
        </div>
        {/* menu select */}
        <div>
          <select
            className="rounded-md py-1 px-2 selectMenu"
            style={{
              backgroundColor: "#5684AE",
              color: "white",
              borderRadius: "9px",
              borderColor: "#5684AE",
            }}>
            <option value="1">Day</option>
            <option value="2">Week</option>
            <option value="3">Month</option>
            <option value="4">Year</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalenderHeader;
