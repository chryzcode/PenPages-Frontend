import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Auth = WrappedComponent => {
  const WithAuthComponent = props => {
    const token = Cookies.get("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
      if (!token) {
        navigate("/sign-in");
        toast.error("Authentication timeout");
      }
    }, [token, navigate]);

    // Return the wrapped component here
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default Auth;
