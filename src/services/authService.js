import axios from "axios";
import { AUTHENTICATION_BACKEND_BASE_URL } from "../constants";

const api = axios.create({
  baseURL: AUTHENTICATION_BACKEND_BASE_URL,
});

const register = async (username, email, password, firstName, lastName) => {
  try {
    const response = await api.post("/v1/register", {
      username,
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error.response?.data || error.message);
    throw error;
  }
};

const login = async (usernameOrEmail, password) => {
  try {
    const response = await api.post("/v1/login", { usernameOrEmail, password });
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const forgotPassword = async (usernameOrEmail) => {
  try {
    const response = await api.post("/v1/password/forgot", { usernameOrEmail });
    return response.data;
  } catch (error) {
    console.error(
      "Forgot password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const getUserMe = async (token) => {
  try {
    const response = await api.get("/v1/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Get user error:", error.response?.data || error.message);
    throw error;
  }
};

const updateUser = async (token, userId, user) => {
  try {
    const response = await api.patch(`/v1/users/${userId}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Update user error:", error.response?.data || error.message);
    throw error;
  }
};

const updatePassword = async (token, currentPassword, newPassword) => {
  try {
    const response = await api.put(
      "/v1/password/update",
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Update password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const resetPassword = async (passwordResetToken, newPassword) => {
  try {
    const response = await api.post("/v1/password/reset", {
      token: passwordResetToken,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Reset password error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

const authService = {
  register,
  login,
  forgotPassword,
  getUserMe,
  updateUser,
  updatePassword,
  resetPassword,
};

export default authService;
