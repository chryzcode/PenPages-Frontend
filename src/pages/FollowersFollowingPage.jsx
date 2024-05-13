import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";



const FollowersFollowingPage = () => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        if (data.user) {
          setUser(data["user"]);
          getUserFollowers(data.user._id);
          getUserFollowings();
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
  });
  return <div>FollowersFollowingPage</div>;
};

export default FollowersFollowingPage;
