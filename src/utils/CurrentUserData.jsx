import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:5000/api/v1/";

const getCurrentUserData = async () => {
  const token = Cookies.get("accessToken");
  if (token) {
    try {
      const res = await fetch(`${API_BASE_URL}user/current-user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.user) {
        return data.user;
      }
    } catch (error) {
      console.log("Error in fetching data:", error);
      // toast.error("Failed to get data");
    }
  }
  return null;
};

export default getCurrentUserData;
