import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Followers = ({ userId }) => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [followers, setFollowers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserFollowers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}follower/${userId}/followers`);
        const data = await res.json();
        console.log(data);
        if (data.allFollowers) {
          setFollowers(data["allFollowers"]);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFollowers();
  }, []);

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8">
          <p>Hello</p>
        </div>
      )}
    </>
  );
};

export default Followers;
