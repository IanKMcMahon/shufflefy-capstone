import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { LogoutNavLink } from "./LogoutNavLink.js";
import "./Navigation.css";

function Navigation() {
  const { accessToken } = useContext(AuthContext);

  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand className="navbar-brand" as={NavLink} to="/" exact>
          <b>Shufflefy</b>
        </Navbar.Brand> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
        {accessToken && (
              <>
                <Nav.Link as={NavLink} to="/playlists" exact>
                Playlists
                </Nav.Link>
                <LogoutNavLink className="nav-link active" to="/login" exact>
                Log Out
                </LogoutNavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
