import Cookies from "js-cookie";
import { toast } from "react-toastify";

const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";

const getCurrentUserData = async () => {
  const token = Cookies.get("accessToken");
  try {
    const res = await fetch(`${API_BASE_URL}user/current-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    const data = await res.json();
    return data["user"];
  } catch (error) {
    console.error("Error in fetching data:", error);
    toast.error("Failed to get data");
    return null;
  }
};

export default getCurrentUserData;
