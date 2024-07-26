import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Auth from "../components/Auth";
import { AuthContext } from "../layout/MainLayout";

const SignOutPage = () => {
  const { setAuthState } = useContext(AuthContext);

  useEffect(() => {
    Cookies.remove("accessToken");
    setAuthState(false, null);
    window.location.href = "/";
  }, [setAuthState]);

  return null;
};

export default Auth(SignOutPage);
