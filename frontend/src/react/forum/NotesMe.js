import React, { useEffect } from "react";
import { Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction } from "../../redux/forum/noteActions";

function NotesMe({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <MainScreen title={` ${userInfo.userName}´s Forum..`}>
      <Link to="createForum">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Forum
        </Button>
      </Link>
    </MainScreen>
  );
}

export default NotesMe;
