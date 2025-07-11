import React, { useState } from "react";
import InformationLine from "../InformationLine/InformationLine";
import SmallButton from "../SmallButton/SmallButton";
import authService from "../../services/authService";
import { showToast } from "../Toast/Toast";

const PersonalDataForm = ({ user, token }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  const handleUserChange = (attribute, value) => {
    setEditableUser((prevUser) => ({
      ...prevUser,
      [attribute]: value,
    }));
  };

  const handleSave = async () => {
    setEditMode(false);

    try {
      await authService.updateUser(token, user.id, editableUser);
      showToast.success("User data saved successfully!");
    } catch (e) {
      console.error("Error saving user data:", e);
      showToast.error("Error saving user data, please try again.");

      if (user) {
        setEditableUser({
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    }
  };

  const handleCancel = () => {
    setEditMode(false);

    if (user) {
      setEditableUser({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  };

  return (
    <div className="container big-container">
      <h1 className="container-title">My personal data</h1>
      <div className="container-content">
        <InformationLine
          currentValue={editableUser.username}
          inputMode={editMode}
          onValueChange={(value) => handleUserChange("username", value)}
        >
          Username:
        </InformationLine>
        <InformationLine
          currentValue={editableUser.email}
          inputMode={editMode}
          onValueChange={(value) => handleUserChange("email", value)}
        >
          E-mail:
        </InformationLine>
        <InformationLine
          currentValue={editableUser.firstName}
          inputMode={editMode}
          onValueChange={(value) => handleUserChange("firstName", value)}
        >
          First Name:
        </InformationLine>
        <InformationLine
          currentValue={editableUser.lastName}
          inputMode={editMode}
          onValueChange={(value) => handleUserChange("lastName", value)}
        >
          Last Name:
        </InformationLine>
        {editMode ? (
          <div className="buttons-line">
            <SmallButton
              onClick={handleCancel}
              bgColor="white"
              textColor="gray"
              borderColor="gray"
            >
              Cancel
            </SmallButton>
            <SmallButton onClick={handleSave}>Save changes</SmallButton>
          </div>
        ) : (
          <div className="buttons-line">
            <SmallButton onClick={() => setEditMode(true)}>Edit</SmallButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalDataForm;
