import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Auth = WrappedComponent => {
  const WithAuthComponent = props => {
    const navigate = useNavigate();

    useEffect(() => {
      const authenticated = localStorage.getItem("isAuthenticated") === "true";
      const token = Cookies.get("accessToken");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!authenticated || !token || !userData) {
        Cookies.remove("accessToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        navigate("/sign-in");
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default Auth;
