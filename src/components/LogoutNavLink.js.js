/**
 * Logout(NavLink) Component
 * 
 * This component is designed to handle the Logout option on the navigation bar
 * It simply sets the accessToken state to null and navigates the user to the root
 */

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

export const LogoutNavLink = ({ to, children, ...props }) => {
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    setAccessToken(null);
    navigate("/");
  };

  return (
    <NavLink to={"/"} onClick={handleLogout} {...props}>
      {children}
    </NavLink>
  );
};
