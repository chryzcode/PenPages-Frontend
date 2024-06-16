import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import React, { useState, useEffect } from "react";
import getCurrentUserData from "../utils/CurrentUserData";

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUserData = await getCurrentUserData();
        if (fetchedUserData !== null) {
          setUserData(fetchedUserData);
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userData", JSON.stringify(fetchedUserData));
        } else {
          setUserData(null);
          setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userData");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Fetch initial user data

    const intervalId = setInterval(fetchUserData, 30000); // Increase the interval to 30 seconds

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
