import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import PostListing from "../components/PostListing";
import Cookies from "js-cookie";

const ProfilePage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const navigate = useNavigate();
  const authenticated = localStorage.getItem("isAuthenticated");
  const authenticatedUser = localStorage.getItem("userData");
  const userData = authenticatedUser ? JSON.parse(authenticatedUser) : null;
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          getUserFollowers(data.user._id);
          getUserFollowings(data.user._id);
          checkIfFollowed(data.user._id);
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

    const getUserFollowers = async userId => {
      try {
        const res = await fetch(`${API_BASE_URL}follower/count/${userId}`);
        const data = await res.json();
        if (data.followersCount !== undefined) {
          setFollowersCount(data.followersCount);
        } else if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Failed to get data");
      }
    };

    const getUserFollowings = async userId => {
      try {
        const res = await fetch(`${API_BASE_URL}follower/${username}/following/count`);
        const data = await res.json();
        if (data.followingCount !== undefined) {
          setFollowingCount(data.followingCount);
        } else if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Failed to get data");
      }
    };

    const getUserPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${username}/posts`);
        const data = await res.json();
        if (data.posts) {
          setPosts(data.posts);
        } else if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Failed to get data");
      } finally {
        setPostLoading(false);
      }
    };

    const checkIfFollowed = async userId => {
      if (!userData) return; // Exit if there's no authenticated user
      try {
        const res = await fetch(`${API_BASE_URL}follower/${userId}/followers`);
        const data = await res.json();
        if (data.allFollowers) {
          const isFollowed = data.allFollowers.some(follower => follower._id === userData._id);
          setFollowed(isFollowed);
        } else if (data.error) {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error("Failed to get data");
      }
    };

    fetchUserData();
    getUserPosts();
  }, [username, API_BASE_URL, navigate, userData ? userData._id : null]); // Added dependencies to useEffect

  const followUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}follower/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFollowed(true);
        setFollowersCount(prevCount => prevCount + 1); // Increment followers count
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to get data");
    }
  };

  const unfollowUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}follower/unfollow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setFollowed(false);
        setFollowersCount(prevCount => prevCount - 1); // Decrement followers count
        toast.success(data.success);
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Failed to get data");
    }
  };

  const onFollowClick = () => {
    if (followed) {
      unfollowUser();
    } else {
      followUser();
    }
  };

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
          {user && (
            <div className="flex flex-col md:flex-row justify-between items-center mb-5 w-full mx-auto">
              <div className="flex flex-col md:flex-row items-center">
                <img
                  className="w-36 h-36 object-cover rounded-full mx-auto"
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  style={{ objectPosition: "center top" }}
                />
                <div className="md:pl-10 text-center md:text-left mt-4 md:mt-0">
                  <h1 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h1>
                  <div className="my-1">{user.bio}</div>
                  <p className="text-sm mt-4">
                    <Link to={`/profile/${username}/followers`} className="pr-3">
                      <span className="font-semibold">{followersCount}</span>{" "}
                      {followersCount > 1 ? "followers" : "follower"}
                    </Link>
                    <Link to={`/profile/${username}/followings`}>
                      <span className="font-semibold">{followingCount}</span>{" "}
                      {followingCount > 1 ? "followings" : "following"}
                    </Link>
                  </p>
                </div>
              </div>

              {authenticated && userData && (
                <div className="mt-4 md:mt-0">
                  {userData.username === username ? (
                    <Link
                      to="/settings"
                      className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold my-2 text-white py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
                      Edit
                    </Link>
                  ) : (
                    <button
                      onClick={onFollowClick}
                      className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold my-2 text-white py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
                      {followed ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="my-6">
            {postLoading ? (
              <h2>
                <Spinner size={100} color={"#6c63ff"} display={"block"} />
              </h2>
            ) : posts && posts.length > 0 ? (
              <>
                <p className="my-10 text-customPurple mx-auto w-max text-2xl font-semibold">My Contents</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {posts.map(post => (
                    <PostListing key={post._id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center text-customPurple text-3xl">No posts available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
