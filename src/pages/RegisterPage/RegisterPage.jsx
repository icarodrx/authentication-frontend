import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import InputField from "../../components/InputField/InputField";
import authService from "../../services/authService";
import { showToast } from "../../components/Toast/Toast";
import SmallButton from "../../components/SmallButton/SmallButton";
import { useValidatePassword } from "../../hooks/useValidatePassword";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { validatePassword } = useValidatePassword();
  const navigate = useNavigate();

  const validate = () => {
    if (!firstName.trim()) {
      showToast.error("The first name is required");
      return false;
    }

    if (!username.trim()) {
      showToast.error("The username is required");
      return false;
    }

    if (!email.trim()) {
      showToast.error("The e-mail is required");
      return false;
    }

    if (!password.trim()) {
      showToast.error("The password is required");
      return false;
    }

    const { isValid } = validatePassword(password);

    if (!isValid) {
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register(
        username,
        email,
        password,
        firstName,
        lastName
      );
      showToast.success("The user was created successfully");
      navigate("/login");
    } catch {
      showToast.error("An error ocurred. Please, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container big-container">
      <BackButton to="/login" />
      <h1 className="container-title">Register</h1>
      <InputField
        label="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Enter your first name"
      ></InputField>
      <InputField
        label="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Enter your last name"
      ></InputField>
      <InputField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      ></InputField>
      <InputField
        label="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your e-mail"
      ></InputField>
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      ></InputField>
      <SmallButton isLoading={isLoading} onClick={handleRegister}>
        Create account
      </SmallButton>
    </div>
  );
};

export default RegisterPage;
