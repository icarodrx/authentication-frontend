import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";
import InputField from "../../components/InputField/InputField";
import BackButton from "../../components/BackButton/BackButton";
import authService from "../../services/authService";
import SmallButton from "../../components/SmallButton/SmallButton";

const ForgotPasswordPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!usernameOrEmail.trim()) {
      showToast.error("Username or email is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleForgotPassword = async (e) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.forgotPassword(usernameOrEmail);
      showToast.success("If the user exists, a email was sent.");
      navigate("/login");
    } catch {
      showToast.error("An error ocurred. Please, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container small-container">
      <BackButton to="/login" />
      <h1 className="container-title">Forgot password?</h1>
      <InputField
        label={"Username or email"}
        value={usernameOrEmail}
        onChange={(e) => {
          setUsernameOrEmail(e.target.value);
        }}
        placeholder="Enter your username or email"
      ></InputField>
      <SmallButton onClick={handleForgotPassword} isLoading={isLoading}>
        Send reset link to e-mail
      </SmallButton>
    </div>
  );
};

export default ForgotPasswordPage;
