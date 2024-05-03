import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        if (data.user) {
          setUserData(data["user"]);
        } else if (data.error) {
          toast.error(data.error);
        }
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

export default Auth(ProfilePage);
