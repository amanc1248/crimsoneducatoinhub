import React from "react";

import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    const logout = window.confirm("Are you sure you want to exit?");
    if (logout === true) {
      localStorage.removeItem("token");
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("userId");
      localStorage.removeItem("login");
      navigate("/login");
    }
  };
  return (
    <div className="logout" onClick={logoutUser}>
      <div className="logout__icon">
        <LogoutIcon />
      </div>
      <div className="logout__text">LOGOUT</div>
    </div>
  );
};
