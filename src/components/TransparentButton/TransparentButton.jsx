import React from "react";
import "./TransparentButton.css";

const TransparentButton = ({ children, onClick }) => {
  return (
    <button className="transparent-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default TransparentButton;
