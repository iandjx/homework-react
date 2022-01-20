import React, { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageAction,
  listMessage,
  createMessageAction,
  updateMessageAction,
} from "../../redux/messages/messageActions";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import useStyles from "./styles.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal";
function Messages({ forum }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [messageEdit, setMessageEdit] = useState("");
  const [messageTitle, setMessageTitle] = useState();
  const messageList = useSelector((state) => state.messageList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { messages } = messageList;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    const finalMessage = `${userInfo.userName}: ${message}`;
    await dispatch(createMessageAction(forum._id, finalMessage, messageTitle));
    dispatch(listMessage());
    //setMessage("");
  };

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure? you want to delete")) {
      dispatch(deleteMessageAction(_id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };
  console.log(messages);
  return (
    <div>
      <div className={classes.messagesOuterContainer}>
        <div className={classes.messagesInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {messages
            ?.filter((message) => message.forum === forum._id)
            ?.map((c) => (
              <Typography key={c._id} gutterBottom variant="subtitle1">
                <strong>{c.messageText} </strong>

                {c.user === userInfo._id && (
                  <>
                    <EditIcon onClick={(e) => setMessageEdit(setMessage())} />
                    <IconButton aria-label="delete">
                      <DeleteIcon onClick={() => deleteHandler(c._id)} />
                    </IconButton>
                    <Button onClick={handleOpen}>Open modal</Button>
                    <EditModal
                      open={open}
                      handleClose={handleClose}
                      message={c}
                    />
                  </>
                )}
              </Typography>
            ))}
        </div>
        {userInfo?.userName && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Comments
            </Typography>

            <TextField
              fullwidth="false"
              rows={1}
              variant="outlined"
              label="Add a Title"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
            <TextField
              fullwidth="false"
              rows={4}
              variant="outlined"
              label="add a Comment"
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullwidth="false"
              disabled={!message}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
