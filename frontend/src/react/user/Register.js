import React, { useState,useEffect } from "react";
import { Form, Button} from "react-bootstrap";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/user/userActions';
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const Register = ({history}) => {

  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [/*message,*/ setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    
    if (userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);
  
  
  const submitHandler = async (e) => {    
    e.preventDefault()

    if(password == null){
      setMessage('Password must be set');
    }
    else{
      dispatch(register(userID,userName,password));
    }
  }

  
  return <MainScreen title='REGISTER'>
     <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicuserID">
            <Form.Label>userID</Form.Label>
            <Form.Control
              type="userID"
              value={userID}
              placeholder="Enter userID"
              onChange={(e) => setuserID(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicuserName">
            <Form.Label>userName</Form.Label>
            <Form.Control
              type="userName"
              value={userName}
              placeholder="Enter userName"
              onChange={(e) => setuserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        
      </div>
  </MainScreen>;
}

export default Register;
