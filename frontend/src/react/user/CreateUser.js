import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/user/userActions";

import "./ProfileEdit.css";
import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const CreateUser = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  //const { userInfo } = userRegister;

  const resetHandler = () => {
    setuserID("");
    setuserName("");
    setPassword("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/userManagement");
    } else {
      setuserID(userInfo.userID);
      setuserName(userInfo.userName);
      setPassword(userInfo.password);
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    resetHandler();
    dispatch(register(userID, userName, password));
    if (!userID || !userName || !password) return;
  };
  return (
    <MainScreen title="Create an User">
      <div>
        <Row className="userCreat">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  id="UserIDInput"
                  type="text"
                  placeholder="User ID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  id="UserNameInput"
                  type="text"
                  placeholder="userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="PasswordInput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button id="CreateUserButton" type="submit" variant="primary">
                Create User
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/*<img src={pic} alt={userID} className="profilePic" />*/}
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default CreateUser;
