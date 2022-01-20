import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../redux/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import "./TopMenu.css";

const TopMenu = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logouthandler = () => {
    dispatch(logout());
    history.push("/");
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand id="NavbarBrand">
            <Link to="/">Gamerforum</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/forums">Forums</Nav.Link>

              {userInfo ? (
                <Nav.Link></Nav.Link>
              ) : (
                <Nav.Link href="/register">Register</Nav.Link>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.userID} id="basic-nav-dropdown">
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/notesMe">My Posts</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/profile">My Profile</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item id="LogoutButton" onClick={logouthandler}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              ) : (
                <Nav.Link id="LoginOpenDialogButton" href="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default TopMenu;
