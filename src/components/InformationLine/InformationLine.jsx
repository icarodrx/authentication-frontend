import React from "react";
import "./InformationLine.css";

const InformationLine = ({
  children,
  currentValue,
  inputMode,
  onValueChange,
}) => {
  const handleInputChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <div className="information-line">
      <span className="information-line-attribute">{children}</span>
      {inputMode ? (
        <input
          type="text"
          value={currentValue}
          onChange={handleInputChange}
        ></input>
      ) : (
        <span
          className="information-line-value"
          onClick={() => setInputMode(true)}
        >
          {currentValue}
        </span>
      )}
    </div>
  );
};

export default InformationLine;
