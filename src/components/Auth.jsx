import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getCurrentUserData from "../utils/CurrentUserData";

const Auth = WrappedComponent => {
  const WithAuthComponent = props => {
    const navigate = useNavigate();
    const Authentication = async () => {
      const authenticated = await getCurrentUserData();
      if (!authenticated) {
        navigate("/sign-in");
        toast.error("Authentication timeout");
      }
    };

    Authentication();

    // useEffect(() => {
    //   if (!token) {
    //     navigate("/sign-in");
    //     toast.error("Authentication timeout");
    //   }
    // }, [token, navigate]);

    // Return the wrapped component here
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default Auth;
