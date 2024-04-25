import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Function to make authenticated requests with the token from the cookie

const navigate = useNavigate();
const FetchWithAuth = async (url, options = {}) => {
  const token = Cookies.get("accessToken");
  if (!token) {
    navigate("/sign-in");
    toast.error("Authentication timeout");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, { ...options, headers });

  // Handle authentication errors here if needed

  return response;
};

export default FetchWithAuth;
