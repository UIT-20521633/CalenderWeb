import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AbcIcon from "@mui/icons-material/Abc";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EventIcon from "@mui/icons-material/Event";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { EVENT_TYPES } from "../../utils/constants"; // Chắc chắn bạn đã định nghĩa các loại sự kiện
import { addEvent, updateEvent } from "../../redux/Events/EventSlice";
import { addEventAPI, updateEventAPI } from "../../apis";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
const ModalCreateEvent = ({ open, close, day, eventInfo, type = "create" }) => {
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState("");
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // Thêm sự kiện vào danh sách sự kiện
    const infoEvent = {
      title: data.title,
      description: data.description,
      user_id: 1,
      start_time: dayjs(`${data.eventDate} ${data.startTime}`).format(),
      end_time: dayjs(`${data.eventDate} ${data.endTime}`).format(),
      create_at: dayjs(day).format(),
      type: data.eventType,
      color: data.color || selectedLabel,
      status: "active",
    };
    if (type === "edit") {
      await updateEventAPI(infoEvent, eventInfo.id).then((res) => {
        dispatch(updateEvent(res));
        toast.success("Update successs !!");
      });
    } else {
      await addEventAPI(infoEvent).then((res) => {
        dispatch(addEvent(res));
        toast.success("Create a new event successs !!");
      });
    }
    //reset toàn bộ form
    reset();
    close(); // Đóng modal sau khi thêm sự kiện
  };
  const labelsClasses = [
    { color: "#5684AE", label: "Light Blue" },
    { color: "#0F4C81", label: "Dark Blue" },
    { color: "#FFE4C8", label: "Light Orange" },
    { color: "#F9BE81", label: "Dark Orange" },
  ];
  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: "8px",
          padding: "20px 30px",
        }}>
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
          }}>
          <Button color="error" onClick={close} sx={{ borderRadius: "50%" }}>
            X
          </Button>
        </Box>

        <Box
          id="modal-modal-title"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EventIcon />
          <Typography variant="h6" component="h2">
            {type === "edit" ? "Update Event" : " Create a New Event"}
          </Typography>
        </Box>

        <Box id="modal-modal-description" sx={{ my: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {/* Event Title */}
              <Box>
                <TextField
                  fullWidth
                  label="Event Title"
                  type="text"
                  defaultValue={type === "edit" ? eventInfo?.title : ""}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AbcIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("title", {
                    required: "Title is required",
                    minLength: {
                      value: 3,
                      message: "Min Length is 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max Length is 50 characters",
                    },
                  })}
                  error={!!errors["title"]}
                />
              </Box>

              {/* Event Description */}
              <Box>
                <TextField
                  fullWidth
                  label="Description"
                  type="text"
                  variant="outlined"
                  defaultValue={type === "edit" ? eventInfo?.description : ""}
                  multiline
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 3,
                      message: "Min Length is 3 characters",
                    },
                    maxLength: {
                      value: 255,
                      message: "Max Length is 255 characters",
                    },
                  })}
                  error={!!errors["description"]}
                />
              </Box>

              {/* Event Type (Appointment or Event) */}
              <Controller
                name="eventType"
                defaultValue={
                  type === "edit" ? eventInfo?.type : EVENT_TYPES.APPOINTMENT
                }
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    onChange={(event, value) => field.onChange(value)}
                    value={field.value}>
                    <FormControlLabel
                      value={EVENT_TYPES.APPOINTMENT}
                      control={<Radio size="small" />}
                      label="Appointment"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value={EVENT_TYPES.EVENT}
                      control={<Radio size="small" />}
                      label="Event"
                      labelPlacement="start"
                    />
                  </RadioGroup>
                )}
              />

              {/* Event Date */}
              <Box>
                <TextField
                  fullWidth
                  label="Event Date"
                  type="date"
                  defaultValue={day.format("YYYY-MM-DD")}
                  variant="outlined"
                  {...register("eventDate", {
                    required: "Event Date is required",
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors["eventDate"]}
                />
              </Box>

              {/* Event Time */}
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  fullWidth
                  label="Start Time"
                  type="time"
                  defaultValue={
                    type === "edit" &&
                    dayjs(eventInfo?.start_time).format("HH:mm")
                  }
                  variant="outlined"
                  {...register("startTime", {
                    required: "Start Time is required",
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors["startTime"]}
                />
                <TextField
                  fullWidth
                  label="End Time"
                  type="time"
                  defaultValue={
                    type === "edit" &&
                    dayjs(eventInfo?.end_time).format("HH:mm")
                  }
                  variant="outlined"
                  {...register("endTime", {
                    required: "End Time is required",
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors["endTime"]}
                />
              </Box>
              {/* Event Labels */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {labelsClasses.map((label, i) => (
                  <Chip
                    key={i}
                    label={label.label}
                    onClick={() => setSelectedLabel(label.color)}
                    sx={{
                      backgroundColor: label.color,
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight:
                        selectedLabel === label.color ? "bold" : "normal",
                      "&:hover": {
                        backgroundColor:
                          selectedLabel === label.color ? label.color : "#ccc",
                      },
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    icon={
                      selectedLabel === label.color ? (
                        <IconButton size="small" sx={{ color: "white" }}>
                          <CheckIcon />
                        </IconButton>
                      ) : null
                    }
                  />
                ))}
              </Box>
              <Box sx={{ alignSelf: "flex-end" }}>
                <Button
                  className="interceptor-loading"
                  type="submit"
                  variant="contained"
                  color="primary">
                  {type === "edit" ? "Update" : " Create Event"}
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalCreateEvent;
