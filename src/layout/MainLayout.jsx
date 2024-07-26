import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Navbar from "../components/Navbar";
import React, { useState, useEffect, createContext } from "react";
import getCurrentUserData from "../utils/CurrentUserData";

export const AuthContext = createContext();

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));

  const setAuthState = (authState, user) => {
    setIsAuthenticated(authState);
    setUserData(user);
    if (authState) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userData");
    }
  };

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
    <AuthContext.Provider value={{ isAuthenticated, userData, setAuthState }}>
      <Navbar isAuthenticated={isAuthenticated} userData={userData} />
      <Outlet />
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default MainLayout;
