import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

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
              <div key={notification._id}>
                <div>
                  <Link to={`/profile/${notification.fromUser.username}`} className="flex items-center pb-1">
                    {notification.fromUser.imageCloudinaryUrl && (
                      <img className="w-7 mr-1" src={notification.fromUser.imageCloudinaryUrl} alt="User" />
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
