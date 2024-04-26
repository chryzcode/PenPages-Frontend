import React from "react";
import FetchWithAuth from "../components/FetchWithAuth";
import Auth from "../components/Auth";

const ProfilePage = () => {
  const response = FetchWithAuth("api/user/current-user", { method: "GET" });

  return (
    <div>
      <h1>Profile Page </h1>
    </div>
  );
};

export default Auth(ProfilePage);
