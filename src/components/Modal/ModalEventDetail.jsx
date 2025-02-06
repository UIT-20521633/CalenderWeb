import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"; // Import icon đóng
import { Button } from "@mui/material";
import dayjs from "dayjs";
import ShareIcon from "@mui/icons-material/Share";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import AccessTimeFilledRoundedIcon from "@mui/icons-material/AccessTimeFilledRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ModalCreateEvent from "./ModalCreate";
import { deleteEventData, getEventsAPI } from "../../apis";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setEvents } from "../../redux/Events/EventSlice";
import { useEffect } from "react";
const ModalEventDetail = ({
  anchorEl,
  handleClosePopover,
  handleCloseModal,
  eventInfo,
  handleOpen,
  openEdit,
}) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();

  const handleDeleteEvent = async () => {
    try {
      // Xóa sự kiện từ API
      await deleteEventData(eventInfo.id);
      const response = await getEventsAPI();
      dispatch(setEvents(response)); // Dispatch lại action để cập nhật Redux store

      // Đóng Popover sau khi xóa sự kiện
      handleClosePopover();

      // Thông báo thành công
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event!");
    }
  };
  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorPosition={{ top: 0, left: 400 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          borderRadius: "20px",
          border: "1px solid #e0e0e0",
          padding: "10px",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <Box
          sx={{
            width: "440px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: eventInfo?.color || "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
          }}>
          {/* Icon Close */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}>
            <EditRoundedIcon sx={{ mr: 1 }} onClick={handleOpen} />
            {/* Modal tạo sự kiện */}
            <ModalCreateEvent
              open={openEdit}
              close={handleCloseModal}
              day={dayjs(eventInfo?.create_at)}
              eventInfo={eventInfo}
              type="edit"
            />
            <DeleteForeverRoundedIcon
              sx={{ mr: 1 }}
              onClick={handleDeleteEvent}
            />
            <CancelIcon onClick={handleClosePopover} />
          </Box>

          {/* Event Title */}
          <Typography
            variant="h6"
            sx={{
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "#FFE4C8"
                  : "#5684AE",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "10px",
            }}>
            {eventInfo?.title}
          </Typography>

          {/* Event Date */}
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "white"
                  : "#555",
              marginBottom: "15px",
            }}>
            <AccessTimeFilledRoundedIcon sx={{ mr: 1 }} />
            {`${dayjs(eventInfo?.create_at).format("dddd, MMMM D, YYYY")} - 
  ${dayjs(eventInfo?.start_time).format("h:mm A")} - 
  ${dayjs(eventInfo?.end_time).format("h:mm A")}`}
          </Typography>

          {/* Event Description */}
          <Typography
            variant="body2"
            sx={{
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "white"
                  : "#333",
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "14px",
            }}>
            <DescriptionRoundedIcon sx={{ mr: 1 }} />
            {eventInfo?.description}
          </Typography>

          {/* Tags */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                marginRight: "5px",
                marginBottom: "5px",
                fontSize: "16px",
                color:
                  eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                    ? "#FFE4C8"
                    : "#1976d2",
                borderColor:
                  eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                    ? "#FFE4C8"
                    : "#1976d2",
              }}>
              invite via link
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default ModalEventDetail;
