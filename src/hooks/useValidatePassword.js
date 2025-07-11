import { showToast } from "../components/Toast/Toast";

export const useValidatePassword = () => {
  const validatePassword = (password) => {
    let isValid = true;
    let message = "";

    if (!password || password.length === 0) {
      isValid = false;
      message = "Password cannot be empty.";
    } else if (password.length < 8) {
      isValid = false;
      message = "Password must be at least 8 characters long.";
    } else if (!/\d/.test(password)) {
      isValid = false;
      message = "Password must contain at least one digit.";
    } else if (!/[a-zA-Z]/.test(password)) {
      isValid = false;
      message = "Password must contain at least one letter.";
    }

    if (!isValid) {
      showToast.error(message);
    }

    return { isValid, message };
  };

  return { validatePassword };
};
