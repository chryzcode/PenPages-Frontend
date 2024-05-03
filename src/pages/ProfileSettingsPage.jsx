import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ProfileSettingsPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API_BASE_URL}user/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUserData(data["user"]);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run only once when component mounts

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div>
          <h1>Profile Page</h1>
          <span>First Name: {userData.firstName}</span>
          {/* Render other user data here */}
        </div>
      )}
    </>
  );
};

export default Auth(ProfileSettingsPage);
