import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Notifications = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    const getAllNotifications = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}notification`, {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setAllNotifications(data.notifications);
        } else {
          toast.error(data.error || "Failed to get notifications");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to get notifications");
      } finally {
        setIsLoading(false);
      }
    };

    getAllNotifications();
  }, [loggedInUser.token]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          {allNotifications.map(notification => (
            <div key={notification._id} className="p-2 border-b border-gray-200">
              {notification.info}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
