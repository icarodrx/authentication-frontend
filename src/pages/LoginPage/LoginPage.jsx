import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/InputField/InputField";
import BigButton from "../../components/BigButton/BigButton";
import TransparentButton from "../../components/TransparentButton/TransparentButton";
import TextWithLink from "../../components/TextWithLink/TextWithLink";
import authService from "../../services/authService";
import { showToast } from "../../components/Toast/Toast";
import cookieUtils from "../../utils/CookieUtils";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_EXPIRATION_DAYS } from "../../constants";

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = cookieUtils.getCookie(AUTH_COOKIE_NAME);

        if (!authToken) {
          setIsCheckingSession(false);
          return;
        }

        const response = await authService.getUserMe(authToken);
        console.log(response);

        if (response && response.id) {
          navigate("/home");
        } else {
          cookieUtils.removeCookie(AUTH_COOKIE_NAME);
          setIsCheckingSession(false);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
        cookieUtils.removeCookie(AUTH_COOKIE_NAME);
        setIsCheckingSession(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;

    if (!usernameOrEmail.trim()) {
      showToast.error("Username or email is required.");
      isValid = false;
    } else if (!password.trim()) {
      showToast.error("Password is required.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await authService.login(usernameOrEmail, password);
      cookieUtils.setCookie(
        AUTH_COOKIE_NAME,
        data.token,
        AUTH_COOKIE_EXPIRATION_DAYS
      );
      showToast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      showToast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  if (isCheckingSession) {
    return;
  }

  return (
    <div className="container small-container">
      <form onSubmit={handleLogin}>
        <h1 className="container-title">Login</h1>
        <InputField
          label="Username or Email"
          type="text"
          value={usernameOrEmail}
          onChange={(e) => {
            setUsernameOrEmail(e.target.value);
          }}
          placeholder="Enter your username or email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Enter your password"
        />
        <BigButton type="submit" isLoading={isLoading}>
          Login
        </BigButton>
      </form>
      <TransparentButton onClick={handleForgotPassword}>
        Forgot Password?
      </TransparentButton>
      <TextWithLink
        text="Don't have an account?"
        linkText="Create one"
        onClick={handleCreateAccount}
      />
    </div>
  );
};

export default LoginPage;
