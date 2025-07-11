import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import ChevronLeft from "../../assets/icons/chevron-left.svg";

const BackButton = ({ children = "Back", to = -1 }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(to);

  return (
    <div className="back-button" onClick={handleClick}>
      <img src={ChevronLeft} />
      {children}
    </div>
  );
};

export default BackButton;
