import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        <div className="container mx-auto grid grid-cols-1 gap-6">
          <p className="text-base">Followers ({followers.length})</p>

          {followers.map(follower => (
            <Link to={`/profile/${follower.username}`} className="flex py-4 px-4 bg-gray-200 rounded-lg text-left">
              <img className="w-8 mr-3" src={follower.imageCloudinaryUrl} alt="" />
              <div>
                <p className="text-sm font-semibold">
                  {" "}
                  {follower.firstName} {follower.lastName}
                </p>
                <p className="text-sm py-1"> {follower.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Followers;
