import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import "./Login.css";
import Loading from '../components/Loading';
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/user/userActions';

const Login = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    
    if (userInfo) {
      history.push("/profile");
    }
  }, [history, userInfo]);


  const submitHandler = async (e) => {
    e.preventDefault();    

    dispatch(login(userID,password));
  };

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading /> }
        <Form onSubmit={submitHandler}>
          {/*<Form.Group controlId="LoginUserIDInput">*/}
          <Form.Label>userID</Form.Label>
          <Form.Control
            id="LoginUserIDInput"
            type="text"
            value={userID}
            placeholder="User ID"
            name="userID"
            onChange={(e) => setuserID(e.target.value)}
          />
          {/*</Form.Group>*/}

          {/*<Form.Group controlId="LoginPasswordInput">*/}
          <Form.Label>Password</Form.Label>
          <Form.Control
            id="LoginPasswordInput"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/*</Form.Group>*/}

          <Button id="LoginButton" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Not Registered ? <Link to="/register">Register Here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default Login;
