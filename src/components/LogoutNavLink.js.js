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
