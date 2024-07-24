import React, { useState, useEffect } from "react";
import PostListings from "../components/PostListings";
import MiniAuthNavBar from "../components/MiniAuthNavBar";

const PostsPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage on component mount
    const storedIsAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    setIsAuthenticated(storedIsAuthenticated);
    setUserData(storedUserData);
  }, []);
  return (
    <>
      <PostListings />
    </>
  );
};

export default PostsPage;
