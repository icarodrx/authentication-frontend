import React, { useState } from "react";
import "./InputField.css";
import EyeIcon from "../../assets/icons/eye.svg";
import EyeSlashIcon from "../../assets/icons/eye-slash.svg";

const InputField = ({ label, type = "text", value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group-div">
      <label className="input-label">{label}</label>
      <div className="input-field-div">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
        />
        {isPasswordField && (
          <button
            type="button"
            className="input-button-icon"
            onClick={togglePasswordVisibility}
          >
            <img src={showPassword ? EyeSlashIcon : EyeIcon} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
