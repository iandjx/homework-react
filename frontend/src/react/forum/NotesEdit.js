import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userActions";

import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const NotesEdit = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/notesMe");
    } else {
      setuserID(userInfo.userID);
      setuserName(userInfo.userName);
      setPassword(userInfo.password);
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userID, userName, password }));
  };
  return (
    <MainScreen title="EDIT MyNote">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  id="UserIDInput"
                  type="text"
                  placeholder="Enter userID"
                  value={users.userID}
                  onChange={(e) => setuserID(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  id="UserNameInput"
                  type="text"
                  placeholder="Enter userName"
                  value={users.userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="PasswordInput"
                  type="password"
                  placeholder="Enter Password"
                  value={users.password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" varient="primary" onClick={submitHandler}>
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default NotesEdit;
