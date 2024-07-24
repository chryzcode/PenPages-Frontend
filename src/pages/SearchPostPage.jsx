import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import PostListing from "../components/PostListing";
import { toast } from "react-toastify";

const SearchPostPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/post";
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  // Function to fetch all posts
  const fetchAllPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}`, {
        // Assuming your endpoint for fetching all posts
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data && Array.isArray(data.allPosts)) {
        setPosts(data.allPosts);
      } else {
        setPosts([]);
        toast.error("No posts found");
      }
    } catch (error) {
      console.log("Error in fetching data:", error);
      toast.error("Failed to get data");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to search for posts
  const getSearchedPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/search-posts?query=${query}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data && Array.isArray(data.posts)) {
        setPosts(data.posts);
      } else {
        setPosts([]);
        toast.error("No posts found");
      }
    } catch (error) {
      console.log("Error in fetching data:", error);
      toast.error("Failed to get data");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all posts on initial render
  useEffect(() => {
    fetchAllPosts();
  }, []);

  const handleInputChange = e => {
    setQuery(e.target.value);
  };

  const handleSearch = e => {
    if (e.key === "Enter") {
      if (query.trim() === "") {
        fetchAllPosts();
      } else {
        getSearchedPosts();
      }
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="md:w-full w-11/12 mx-auto block p-5">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="Search for posts"
          className="border rounded py-2 px-3 w-full mb-2 focus:outline-none focus:ring-0"
        />
      </div>
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
    </div>
  );
};

export default SearchPostPage;
