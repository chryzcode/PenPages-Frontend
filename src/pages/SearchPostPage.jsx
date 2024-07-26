import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Spinner from "../components/Spinner";
import PostListing from "../components/PostListing";
import { toast } from "react-toastify";

const SearchPostPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/post";
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(storedIsAuthenticated);
  }, []);

  // Function to fetch all posts
  const fetchAllPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}`, {
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
    if (e.key === "Enter" || e.type === "click") {
      if (query.trim() === "") {
        fetchAllPosts();
      } else {
        getSearchedPosts();
      }
    }
  };

  return (
    <div className="container mx-auto my-5">
      <div className="md:w-full w-11/12 mx-auto block px-5">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleSearch}
            placeholder="Search for posts"
            className="border rounded py-2 px-3 pr-10 w-full mb-2 focus:outline-none focus:ring-0"
          />
          <FaSearch
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-customPurple"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="container mx-auto">
        {isLoading ? (
          <h2>
            <Spinner size={100} color={"#6c63ff"} display={"block"} />
          </h2>
        ) : posts.length === 0 ? (
          <p className="text-center text-customPurple text-4xl">No posts available</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-2 my-5">
              {posts.map(post => (
                <PostListing key={post._id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPostPage;
