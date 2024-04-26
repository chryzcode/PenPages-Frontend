import React from "react";
import Auth from "../components/Auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div>
      <h1>Profile Page</h1>
    </div>
  );
};

export default Auth(ProfilePage);
