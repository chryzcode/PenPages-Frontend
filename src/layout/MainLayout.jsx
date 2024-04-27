import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";

const MainLayout = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchAccessToken = () => {
      const token = Cookies.get("accessToken");
      setAccessToken(token);
      if (accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    fetchAccessToken(); 

    const intervalId = setInterval(() => {
      fetchAccessToken(); // Fetch access token every 5 seconds
    }, 5000);

    return () => {
      clearInterval(intervalId); // Clean up interval when component unmounts
    };
  }, [accessToken]);



  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
