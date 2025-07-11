import React, { useState } from "react";
import InputField from "../InputField/InputField";
import Button from "../SmallButton/SmallButton";
import "./ChangePasswordSection.css";
import { showToast } from "../Toast/Toast";
import authService from "../../services/authService";
import { useValidatePassword } from "../../hooks/useValidatePassword";

const ChangePasswordSection = ({ onCancel, token, onPasswordChange }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const { validatePassword } = useValidatePassword();

  const validate = (currentPassword, newPassword, newPasswordConfirmation) => {
    if (!currentPassword || !newPassword || !newPasswordConfirmation) {
      showToast.error("You must provide a value for all required fields.");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      return false;
    }

    if (newPassword !== newPasswordConfirmation) {
      showToast.error("The confirmation does not match the new password.");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
      return false;
    }

    const { isValid } = validatePassword(newPassword);

    if (!isValid) {
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate(currentPassword, newPassword, newPasswordConfirmation)) {
      return;
    }

    try {
      await authService.updatePassword(token, currentPassword, newPassword);
      showToast.success("Password updated successfully.");
      onPasswordChange();
    } catch (error) {
      console.error("Error updating password: ", error);
      showToast.error("Something went wrong, please try again.");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirmation("");
    }
  };

  return (
    <div className="change-password-section">
      <InputField
        label="Current password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      ></InputField>
      <InputField
        label="New password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      ></InputField>
      <InputField
        label="Confirm new password"
        type="password"
        value={newPasswordConfirmation}
        onChange={(e) => setNewPasswordConfirmation(e.target.value)}
      ></InputField>
      <div className="buttons-line">
        <Button
          bgColor="white"
          textColor="gray"
          borderColor="gray"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save changes</Button>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
