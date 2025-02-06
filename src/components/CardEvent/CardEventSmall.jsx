import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import ModalEventDetail from "../Modal/ModalEventDetail";

const CardEventSmall = ({ eventInfo }) => {
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
      <Button
        onClick={(e) => handleClickMore(e)}
        sx={{
          display: "flex",
          textTransform: "none",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "22px",
          borderRadius: "2px",
          borderLeft: `4px solid ${
            eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
              ? "#FFE4C8"
              : "#5684AE"
          }`,
          backgroundColor: eventInfo?.color || "#FFE4C8",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
        <Box sx={{ ml: 0.3, overflow: "hidden", width: "100%" }}>
          <Typography
            sx={{
              color:
                eventInfo.color === "#5684AE" || eventInfo.color === "#0F4C81"
                  ? "white"
                  : "#092C54",
              fontSize: "10px",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "block",
            }}>
            {eventInfo?.title}
          </Typography>
        </Box>
      </Button>
      <ModalEventDetail
        anchorEl={anchorEl}
        handleClosePopover={handleCloseDay}
        handleCloseModal={() => setOpen(false)}
        eventInfo={eventInfo}
        handleOpen={() => setOpen(true)}
        openEdit={open}
      />
    </>
  );
};

export default CardEventSmall;
