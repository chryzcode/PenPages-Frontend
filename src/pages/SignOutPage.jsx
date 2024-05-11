import Cookies from "js-cookie";
import Auth from "../components/Auth";

const SignOutPage = () => {
  Cookies.remove("accessToken");
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userData");
  window.location.href = "/sign-in";
};

export default Auth(SignOutPage);
