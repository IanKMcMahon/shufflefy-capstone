import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import "./Navigation.css";

function Navigation() {
  const { accessToken } = useContext(AuthContext); // Assuming you need access to the accessToken for some logic

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/" exact>
          Shufflefy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/playlists" exact>
              Playlists
            </Nav.Link>
            {accessToken && (
              <Nav.Link as={NavLink} to="/logout" exact>
                Log Out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
