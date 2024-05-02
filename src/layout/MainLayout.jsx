import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import getCurrentUserData from "../utils/CurrentUserData";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getCurrentUserData();
      setIsAuthenticated(userData !== null);
    };

    fetchUserData();

    const intervalId = setInterval(() => {
      fetchUserData(); // Fetch user data every 5 seconds
    }, 5000);

    return () => {
      clearInterval(intervalId); // Clean up interval when component unmounts
    };
  }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
