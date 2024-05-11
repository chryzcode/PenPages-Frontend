import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostListing from "../components/PostListing";

import Followers from "../components/Followers";

const ProfilePage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [followersCount, setFollowersCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        if (data.user) {
          setUser(data["user"]);
          getUserFollowers(data.user._id);
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

    const getUserFollowers = async userId => {
      try {
        const res = await fetch(`${API_BASE_URL}follower/count/${userId}`);
        const data = await res.json();
        if (data.followersCount) {
          setFollowersCount(data.followersCount);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
          navigate("/not-found");
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      }
    };

    const getUserPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${username}/posts`);
        const data = await res.json();
        if (data.posts) {
          setPosts(data["posts"]);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setPostLoading(false);
      }
    };

    getUserPosts();
    fetchUserData();
  }, []); // Run only once when component mounts

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8">
          {user && (
            <div className="text-center">
              <img className="w-52 h-52 object-contain mx-auto" src={user.imageCloudinaryUrl} alt="" />
              <h1 className="text-3xl py-1">
                {user.firstName} {user.lastName}
              </h1>
              <p className="font-semibold">@{user.username}</p>
              <div className="text-lg my-2">{user.bio}</div>
              <p>
                {followersCount} {followersCount > 1 ? "followers" : "follower"}
              </p>
              <div>
                <Followers userId={user._id} />
              </div>
              <button className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold my-2 text-white py-2 px-6 rounded-full focus:outline-none focus:shadow-outline w-">
                Follow
              </button>
            </div>
          )}

          <div className="my-6 ">
            {postLoading ? (
              <h2>
                <Spinner size={100} color={"#6c63ff"} display={"block"} />
              </h2>
            ) : posts && posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
                {posts.map(post => (
                  <PostListing key={post._id} post={post} />
                ))}
              </div>
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
