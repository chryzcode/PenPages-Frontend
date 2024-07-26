import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import PostListing from "./PostListing";
import Cookies from "js-cookie";

const PersonalisedPostListings = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const token = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedIsAuthenticated);
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/user/personalised/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          toast.error("Authentication failed. Please log in again.");
          setIsAuthenticated(false);
          localStorage.setItem("isAuthenticated", "false");
          return;
        }
        const data = await res.json();
        setPosts(data.allPosts);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      getPosts();
    } else {
      setIsLoading(false);
    }
  }, [API_BASE_URL, token]);

  return (
    <div className="container mx-auto my-10">
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : posts.length === 0 ? (
        <p className="text-center text-customPurple text-4xl">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2">
          {posts.map(post => (
            <PostListing key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalisedPostListings;
