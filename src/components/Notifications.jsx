import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Notifications = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [allNotifications, setAllNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const formatRelativeDate = dateString => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const intervalValue = Math.floor(diffInSeconds / interval.seconds);
      if (intervalValue >= 1) {
        return `${intervalValue} ${interval.label}${intervalValue !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
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
    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          {allNotifications.map(notification => (
            <div key={notification._id} className="p-3 border-b border-gray-200">
              <div>
                <Link to={`/profile/${notification.fromUser.username}`} className="flex items-center pb-3">
                  {notification.fromUser.imageCloudinaryUrl && (
                    <img className="w-8 mr-1" src={notification.fromUser.imageCloudinaryUrl} />
                  )}
                  <span className="text-xs font-semibold">
                    {notification.fromUser.firstName} {notification.fromUser.lastName}
                    <span className="text-xs">
                      {notification.createdAt && (
                        <p className="text-xs font-extralight text-left">
                          {formatRelativeDate(notification.createdAt)}
                        </p>
                      )}
                    </span>
                  </span>
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
                {notification.info}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
