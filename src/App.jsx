import Box from "@mui/material/Box";
import CalenderBig from "./components/CalenderBig/CalenderBig";
import CalenderSmall from "./components/CalenderSmall/CalenderSmall";
import Grid from "@mui/material/Grid2";
import UpcomEvent from "./components/UpcomEvent/UpcomEvent";
import { useDispatch } from "react-redux";
import {
  setMonthIndex,
  setMonthIndexSmall,
} from "./redux/Calender/calenderSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getEventsAPI } from "./apis";
import { setEvents } from "./redux/Events/EventSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    getEventsAPI().then((res) => {
      dispatch(setEvents(res));
    });
    dispatch(setMonthIndex(dayjs().month()));
    dispatch(setMonthIndexSmall(dayjs().month()));
  }, [dispatch]);
  return (
    <Box
      className="container"
      sx={{ backgroundColor: "#E4F6ED", height: "100vh" }}>
      <Box
        sx={{
          mx: 25,
          py: 2,
          width: "85%",
          height: "100vh",
          overflow: "hidden",
        }}>
        <Grid container>
          <Grid size={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "95%",
                height: "100vh",
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "10px",
              }}>
              <Box>
                <CalenderSmall />
              </Box>
              <Box sx={{ mt: 2 }}>
                <UpcomEvent />
              </Box>
            </Box>
          </Grid>
          <Grid size={8}>
            <CalenderBig />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
