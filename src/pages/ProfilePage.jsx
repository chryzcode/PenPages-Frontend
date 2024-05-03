import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.user) {
          setUserData(data["user"]);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
          navigate("/not-found");
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
          <p>UserProfile</p>
          {userData && ( // Conditional rendering
            <span>First Name: {userData.firstName}</span>
            // Render other user data here
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
