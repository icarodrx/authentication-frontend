import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookieUtils from "../../utils/CookieUtils";
import { AUTH_COOKIE_NAME } from "../../constants";
import InformationLine from "../../components/InformationLine/InformationLine";
import ChangePasswordSection from "../../components/ChangePasswordSection/ChangePasswordSection";
import SmallButton from "../../components/SmallButton/SmallButton";
import PersonalDataForm from "../../components/PersonalDataForm/PersonalDataForm";
import authService from "../../services/authService";

const HomePage = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cookieAuthToken = cookieUtils.getCookie(AUTH_COOKIE_NAME);

        if (!cookieAuthToken) {
          navigate("/login");
          return;
        }

        setToken(cookieAuthToken);
        const response = await authService.getUserMe(cookieAuthToken);
        setUser(response);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching user data:", e);
        cookieUtils.removeCookie(AUTH_COOKIE_NAME);
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = () => {
    setEditMode(false);
  };

  const handleLogout = () => {
    cookieUtils.removeCookie(AUTH_COOKIE_NAME);
    navigate("/login");
  };

  if (loading) {
    return;
  }

  return (
    <div className="container-of-containers">
      <div className="container big-container container-left-aligned">
        <h1 className="container-title">
          Hello, {user ? user.firstName : "user"}
        </h1>
        <p className="container-subtitle">
          You've been successfully authenticated ✅
        </p>
      </div>
      <PersonalDataForm user={user} token={token}></PersonalDataForm>
      <div className="container big-container">
        <h1 className="container-title">Security</h1>
        <div className="container-content">
          <InformationLine currentValue="**********" inputMode={false}>
            Password:
          </InformationLine>
          {editMode ? (
            <ChangePasswordSection
              onCancel={() => setEditMode(false)}
              token={token}
              onPasswordChange={handlePasswordChange}
            ></ChangePasswordSection>
          ) : (
            <div className="buttons-line">
              <SmallButton onClick={() => setEditMode(true)}>Edit</SmallButton>
            </div>
          )}
        </div>
      </div>
      <div className="container big-container invisible-container">
        <SmallButton bgColor="oklch(45% 0.28 20)" onClick={handleLogout}>
          Logout
        </SmallButton>
      </div>
    </div>
  );
};

export default HomePage;
