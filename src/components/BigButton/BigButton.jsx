import React from "react";
import "./BigButton.css";

const BigButton = ({
  children,
  onClick,
  type = "button",
  bgColor = "oklch(54.6% 0.245 262.881)",
  textColor = "white",
  borderColor = "transparent",
  isLoading = false,
  ...props
}) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
      className="big-button"
      onClick={onClick}
      type={type}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </button>
  );
};

export default BigButton;
