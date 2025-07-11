import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField/InputField";
import SmallButton from "../../components/SmallButton/SmallButton";
import authService from "../../services/authService";
import { useValidatePassword } from "../../hooks/useValidatePassword";
import { showToast } from "../../components/Toast/Toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

  const { validatePassword } = useValidatePassword();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      showToast.error("Reset token not found in the URL.");
      navigate("/login");
    }
  }, [token, navigate]);

  const validate = () => {
    if (!newPassword || !newPasswordConfirmation) {
      showToast.error("You must provide a value for all required fields.");
      return false;
    }

    if (newPassword !== newPasswordConfirmation) {
      showToast.error("The confirmation does not match the new password.");
      return false;
    }

    const { isValid } = validatePassword(newPassword);

    if (!isValid) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await authService.resetPassword(token, newPassword);
      showToast.success("Password reseted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error resetting password:", error);
      showToast.error("Something went wrong. Please, try again.");
    }
  };

  return (
    <div className="container small-container">
      <h1 className="container-title">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="New password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          type="password"
        ></InputField>
        <InputField
          label="Confirm new password"
          placeholder="Enter your new password again for confirmation"
          value={newPasswordConfirmation}
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
          type="password"
        ></InputField>
        <SmallButton type="submit">Reset password</SmallButton>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
