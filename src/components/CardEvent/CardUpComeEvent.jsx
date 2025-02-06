import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { IoVideocamOutline } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import dayjs from "dayjs";
import Link from "@mui/material/Link";
import { getUsersAPI } from "../../apis";
import ModalEventDetail from "../Modal/ModalEventDetail";
const CardUpComeEvent = ({ eventInfo }) => {
  const [users, setListUser] = useState([]);
  // Kiểm tra nếu ngày bắt đầu hoặc kết thúc khác với ngày tạo
  const isSameStartDate = dayjs(eventInfo?.create_at).isSame(
    dayjs(eventInfo?.start_time),
    "day"
  );
  const isSameEndDate = dayjs(eventInfo?.create_at).isSame(
    dayjs(eventInfo?.start_time),
    "day"
  );
  useEffect(() => {
    getUsersAPI().then((res) => {
      setListUser(res);
    });
  });

  // Định dạng giờ và ngày tháng nếu ngày khác
  const startTime = isSameStartDate
    ? dayjs(eventInfo?.start_time).format("hh:mm A") // Chỉ hiển thị giờ
    : dayjs(eventInfo?.start_time).format("MM-DD hh:mm A"); // Hiển thị ngày và giờ

  const endTime = isSameEndDate
    ? dayjs(eventInfo?.end_time).format("hh:mm A") // Chỉ hiển thị giờ
    : dayjs(eventInfo?.end_time).format("MM-DD hh:mm A"); // Hiển thị ngày và giờ
  //Lấy thông tin user từ eventInfo
  const user = users.find((user) => user.id === eventInfo?.user_id);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDay = () => {
    setAnchorEl(null); // Close the "more" button modal
  };
  return (
    <>
      <Box
        onClick={(e) => handleClickMore(e)}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "99%",
          height: "110px",
          borderRadius: "10px",
          borderLeft: `10px solid ${
            eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
              ? "#FFE4C8"
              : "#5684AE"
          }`,
          backgroundColor: eventInfo?.color || "#FFE4C8",
          mt: 1,
          pr: 1,
          py: 1,
          position: "relative",
        }}>
        <Box sx={{ ml: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "white"
                  : "#092C54",
              fontWeight: "600",
            }}>
            {eventInfo?.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "#FFE4C8"
                  : "#5E6267",
              fontWeight: "300",
            }}>
            {startTime} - {endTime} GMT+8
          </Typography>
          {eventInfo?.type === "appointment" && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
              <Avatar alt={user?.username} src={user?.avatar} />
              <Link
                sx={{
                  color:
                    eventInfo.color === "#5684AE" ||
                    eventInfo.color === "#0F4C81"
                      ? "#FFE4C8"
                      : "#5684AE",
                }}
                href="#">
                View Client Proflie
              </Link>
            </Box>
          )}
        </Box>
        {eventInfo?.type === "appointment" && (
          <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
            <IconButton
              sx={{
                width: "35px",
                height: "35px",
                backgroundColor:
                  eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                    ? "#FFE4C8"
                    : "#5684AE",
                color: "white",
                borderRadius: "50%",
                padding: "3px",
                fontSize: "25px",
                "&:hover": {
                  backgroundColor: "#092C54",
                },
              }}>
              <IoVideocamOutline
                style={{
                  padding: "none",
                }}
              />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box>
        <ModalEventDetail
          anchorEl={anchorEl}
          handleClosePopover={handleCloseDay}
          handleCloseModal={() => setOpen(false)}
          eventInfo={eventInfo}
          handleOpen={() => setOpen(true)}
          openEdit={open}
        />
      </Box>
    </>
  );
};

export default CardUpComeEvent;
