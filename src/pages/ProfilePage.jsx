import React from "react";
import FetchWithAuth from "../components/FetchWithAuth";
import Auth from "../components/Auth";

const ProfilePage = () => {
  const user = FetchWithAuth("api/user/current-user", { method: "GET" });
  const name = user.firstName;
  return (
    <div>
      <h1>Profile Page {name}</h1>
    </div>
  );
};

export default Auth(ProfilePage);
