import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import getCurrentUserData from "../utils/CurrentUserData";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUserData = await getCurrentUserData();
      if (fetchedUserData !== null) {
        setUserData(fetchedUserData);
        setIsAuthenticated(true);
      }
    };

    fetchUserData(); // Fetch initial user data

    const intervalId = setInterval(fetchUserData, 5000); // Setup interval to fetch user data every 5 seconds

    return () => {
      clearInterval(intervalId); // Clean up interval when component unmounts
    };
  }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} userData={userData} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
