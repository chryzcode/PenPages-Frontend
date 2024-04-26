import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Function to make authenticated requests with the token from the cookie

const FetchWithAuth = async (url, options = {}) => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  if (!token) {
    navigate("/sign-in");
    toast.error("Authentication timeout");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  // Handle authentication errors here if needed
  return response;
};

export default FetchWithAuth;
