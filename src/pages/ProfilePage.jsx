import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch("/api/user/current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUserData(data["user"]);
      } catch (error) {
        console.error("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run only once when component mounts

  return (
    <div>
      <h1>Profile Page</h1>

      {isLoading ? (
        <h2>
          <Spinner />
        </h2>
      ) : (
        <div>
          <span>First Name: {userData.firstName}</span>
          {/* Render other user data here */}
        </div>
      )}
    </div>
  );
};

export default Auth(ProfilePage);
