import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Followers from "../components/Followers";
import Followings from "../components/Followings";
import { useNavigate } from "react-router-dom";

const FollowersFollowingPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authenticated = localStorage.getItem("isAuthenticated");
  const authenticatedUser = localStorage.getItem("userData");
  const userData = JSON.parse(authenticatedUser);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        if (data.user) {
          setUser(data["user"]);
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
  }, []);

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8 grid grid-cols-3 gap-x-4 gap-y-8">
          <div className="py-4 px-6 rounded-md" style={{ boxShadow: "0px 0px 4px rgba(181, 176, 176, 0.5)" }}>
            {user && (
              <div className="">
                <img className="w-24 h-24 object-contain" src={user.imageCloudinaryUrl} alt="" />
                <Link to={`/profile/${user.username}`} className="text-lg font-bold align-middle my-3">
                  {user.firstName} {user.lastName}
                </Link>
                <p className="text-sm">{user.bio}</p>
              </div>
            )}

            {authenticated ? (
              <div className="my-5">
                {" "}
                {userData.username == username ? (
                  <Link
                    to="/settings"
                    className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold my-2 text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-">
                    Edit Profile
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <div>{user ? <Followers userId={user._id} /> : null}</div>

          <div>{user ? <Followings userId={user._id} /> : null}</div>
        </div>
      )}
    </>
  );
};

export default FollowersFollowingPage;
