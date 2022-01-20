import React, { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MainScreen from "../components/MainScreen";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import {
  deleteUserAction /*, updateUser*/ /*, register*/,
  getUsers,
} from "../../redux/user/userActions";
import "./ProfileEdit.css";

//import axios from "axios";

function UserManagement({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);
  const { loading } = userLogin;
  const { users } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, history]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? you want to delete")) {
      dispatch(deleteUserAction(id));
    }
  };

  return (
    <MainScreen title={`List of Users`}>
      <Link to="/createUser" id="OpenCreateUserDialogButton">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new User
        </Button>
      </Link>

      {users &&
        users.map((user) => (
          <Accordion defaultActiveKey="0">
            <Accordion.Item style={{ margin: 10 }} key={user.userID}>
              <Accordion.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {user.userID}
                </span>
                <div>
                  <Link
                    to={{
                      pathname: "/profileedit",
                      query: { user },
                    }}
                  >
                    <Button id="EditButton">Edit</Button>
                  </Link>
                  <Button
                    id="DeleteButton"
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(user.userID)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{user.userName}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    ID by user:<div>{user.userID}</div>
                    UserID:<div>{user.userID}</div>
                    userName:<div>{user.userName}</div>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default UserManagement;
