import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import Followers from "../components/Followers";
import Followings from "../components/Followings";
import { useNavigate } from "react-router-dom";

const FollowersFollowingPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username, section } = useParams(); // Get section from params
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
          setUser(data.user);
        } else if (data.error) {
          toast.error(data.error);
          navigate("/not-found");
        }
      } catch (error) {
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username, API_BASE_URL, navigate]);

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8 px-4">
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Profile Information */}
            <div className="flex-shrink-0 py-4 px-6 rounded-md shadow-md bg-white mb-4 lg:mb-0 w-full lg:w-1/3">
              {user && (
                <div className="text-center lg:text-left">
                  <img className="w-24 h-24 rounded-full object-cover mx-auto lg:mx-0" src={user.image} alt="" />
                  <Link to={`/profile/${user.username}`} className="text-lg font-bold mt-3 block">
                    {user.firstName} {user.lastName}
                  </Link>
                  <p className="text-sm mt-1">{user.bio}</p>
                </div>
              )}

              {authenticated && (
                <div className="mt-5 text-center lg:text-left">
                  {userData.username === username && (
                    <Link
                      to="/settings"
                      className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold text-white py-2 px-4 rounded-full">
                      Edit Profile
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Followers/Followings Section */}
            <div className="w-full lg:w-2/3">
              <div className="text-center mt-4">
                <Link
                  to={`/profile/${username}/followers`}
                  className={`text-blue-500 ${section === "followers" ? "font-bold" : ""}`}>
                  Followers
                </Link>
                <span className="mx-2">|</span>
                <Link
                  to={`/profile/${username}/followings`}
                  className={`text-blue-500 ${section === "followings" ? "font-bold" : ""}`}>
                  Followings
                </Link>
              </div>

              {/* Render followers or followings based on the section */}
              <div className="mt-8">
                {section === "followers" && user ? (
                  <Followers userId={user._id} />
                ) : section === "followings" && user ? (
                  <Followings userId={user._id} />
                ) : (
                  <div className="text-center">
                    <p>Select either Followers or Followings from the links above.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowersFollowingPage;
