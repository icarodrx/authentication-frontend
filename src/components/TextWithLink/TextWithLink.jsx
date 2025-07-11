import React from "react";
import "./TextWithLink.css";

const TextWithLink = ({ text, linkText, onClick }) => {
  return (
    <p className="text-with-link">
      {text}{" "}
      <span className="text-link" onClick={onClick}>
        {linkText}
      </span>
    </p>
  );
};

export default TextWithLink;
