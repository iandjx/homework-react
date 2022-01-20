import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/user/userActions";

import "./ProfileEdit.css";
import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const Profile = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;
  useEffect(() => {
    if (!userInfo) {
      history.push("/myProfile");
    } else {
      setuserID(userInfo.userID);
      setuserName(userInfo.userName);
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ userID, userName, password }));
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        {userInfo.isAdministrator ? (
          <Link id="OpenUserManagament" to="/userManagement">
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
              User Management
            </Button>
          </Link>
        ) : (
          <Link></Link>
        )}
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  type="text"
                  value={userID}
                  readOnly={userID}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                id="SaveUserButton"
                type="submit"
                varient="primary"
                onClick={submitHandler}
              >
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

export default Profile;
