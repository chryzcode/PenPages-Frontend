import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import PostListing from "./PostListing";
import Auth from "./Auth";
import Cookies from "js-cookie";

const PersonalisedPostListings = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const token = Cookies.get("accessToken");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/personalised/posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data["allPosts"]);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);
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

export default Auth(PersonalisedPostListings);