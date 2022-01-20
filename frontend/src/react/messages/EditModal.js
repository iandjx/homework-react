import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, handleClose, message }) => {
  const [messageText, setMessageText] = useState(message.messageText);
  const [messageTitle, setMessageTitle] = useState(message.messageTitle);
  const handleDelete = () => {};
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          style={{ width: "100%" }}
          value={messageTitle}
          onChange={(e) => setMessageTitle(e.target.value)}
          id="outlined-basic"
          label="Title"
        />
        <TextField
          multiline
          rows={3}
          style={{ width: "100%" }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          id="outlined-basic"
          label="Body"
        />

        <Button style={{ marginTop: "10px" }} onClick={handleDelete}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
