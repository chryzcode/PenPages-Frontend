import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import getCurrentUserData from "../utils/CurrentUserData";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const Authentication = async () => {
    const authenticated = await getCurrentUserData();
    if (authenticated) {
      setIsAuthenticated(true);
    }
  };

  Authentication();

  // useEffect(() => {
  //   const fetchAccessToken = () => {
  //     const token = Cookies.get("accessToken");
  //     if (token) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   fetchAccessToken();

  //   const intervalId = setInterval(() => {
  //     fetchAccessToken(); // Fetch access token every 5 seconds
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalId); // Clean up interval when component unmounts
  //   };
  // }, []);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
