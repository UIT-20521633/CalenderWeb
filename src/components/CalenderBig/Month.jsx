import React from "react";
import Day from "./Day";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectMonthCurrent } from "../../redux/Calender/calenderSlice";
const Month = () => {
  const month = useSelector(selectMonthCurrent);
  return (
    <>
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row, i) =>
          row.map((day, j) => <Day key={j} day={day} rowIdx={i} />)
        )}
      </div>
    </>
  );
};

export default Month;
