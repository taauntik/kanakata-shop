import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

function Header({ checkUser }) {
  let [user, setUser] = useContext(UserContext);
  // const { user, setUser } = checkUser;
  const handleSignOut = () => {
    const signOutUser = {
      isSignedIn: false,
      name: "",
      email: "",
    };
    setUser(signOutUser);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Kenakata-shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>
            <Nav.Link as={Link} to="/Deals">
              Deals
            </Nav.Link>
            {user.isSignedIn ? (
              <Button onClick={handleSignOut} variant="primary">
                Log out
              </Button>
            ) : (
              <Button as={Link} to="/login" variant="primary">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
