import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import "../notifications.css"; // Import the CSS file for custom styles

const Notifications = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

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
    <div>
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          {allNotifications.length > 0 ? (
            allNotifications.map(notification => (
              <div
                key={notification._id}
                className={`relative p-2 mb-2 border-b ${notification.read ? "bg-white" : "bg-gray-100"}`}>
                {!notification.read && <div className="absolute inset-0 bg-blue-500 opacity-20"></div>}
                <div className="relative z-10">
                  <div>
                    <Link to={`/profile/${notification.fromUser.username}`} className="flex items-center pb-1">
                      {notification.fromUser.image && (
                        <img
                          className="w-7 h-7 rounded-full mr-1"
                          src={notification.fromUser.image}
                          alt="User"
                        />
                      )}
                    </Link>
                  </div>

                  <Link
                    to={
                      notification.type === "post"
                        ? `/post/${notification.info_id}`
                        : notification.type === "profile"
                        ? `/profile/${notification.info_id}`
                        : "#"
                    }
                    className="text-sm">
                    <div className="py-2 text-base">{notification.info}</div>

                    <span className="text-xs">
                      {notification.createdAt && (
                        <p className="text-xs font-extralight text-left">{formatDate(notification.createdAt)}</p>
                      )}
                    </span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
