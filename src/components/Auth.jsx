import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getCurrentUserData from "../utils/CurrentUserData";
import Cookies from "js-cookie";

const Auth = WrappedComponent => {
  const WithAuthComponent = props => {
    const navigate = useNavigate();
    const Authentication = async () => {
      const authenticated = await getCurrentUserData();
      if (!authenticated) {
        // navigate("/sign-in");
        Cookies.remove("accessToken");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userData");
        toast.error("Authentication timeout");
      }
    };

    Authentication();

    // Return the wrapped component here
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default Auth;
