import React from "react";
import "./Scrollbox.css"; // Create a CSS file for this component if needed

const Scrollbox = ({ children }) => {
  return <div className="scrollbox">{children}</div>;
};

export default Scrollbox;
