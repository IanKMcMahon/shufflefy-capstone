/* Reusable Scrollbox component for UI continuity */

import React from "react";
import "./Scrollbox.css";

const Scrollbox = ({ children }) => {
  return <div className="scrollbox">{children}</div>;
};

export default Scrollbox;
