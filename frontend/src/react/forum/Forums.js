import React, { useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import Messages from "../messages/Messages";
import SendIcon from "@mui/icons-material/Send";
import "./Notes.css";
import { listForum } from "../../redux/forum/noteActions";

function Notes({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteList = useSelector((state) => state.noteList);
  console.log("notelist", noteList);
  const { notes } = noteList;

  useEffect(() => {
    dispatch(listForum());
  }, [dispatch, history]);

  return (
    <MainScreen title={`List of Forum`}>
      {notes &&
        notes?.map((forum) => (
          <Accordion key={forum._id} defaultActiveKey="0">
            <Accordion.Item style={{ margin: 10 }} key={forum._id}>
              <Accordion.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {forum.forumName}
                </span>
              </Accordion.Header>
              <Accordion.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{forum.forumDescription}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    Created by:{forum.ownerID}
                    Created on:{forum.createdAt}
                  </footer>
                </blockquote>
                <div className="messages">
                  <Messages forum={forum} />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default Notes;
