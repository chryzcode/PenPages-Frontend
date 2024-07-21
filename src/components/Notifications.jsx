import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import "../styles/notifications.css"; // Import the CSS file for custom styles

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

  const markAllNotificationsAsRead = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}notification`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setAllNotifications(prevNotifications =>
          prevNotifications.map(notification => ({ ...notification, read: true }))
        );
        toast.success("All notifications marked as read");
      } else {
        toast.error("Failed to mark all notifications as read");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to mark all notifications as read");
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          {allNotifications.length > 0 ? (
            allNotifications.map(notification => (
              <div key={notification._id} className={`notification-item ${notification.read ? "read" : "unread"}`}>
                {!notification.read && <div className="absolute inset-0 bg-blue-500 opacity-20"></div>}
                <div className="relative z-10">
                  <div className="flex items-center">
                    {notification.fromUser.image && (
                      <img className="notification-user-image" src={notification.fromUser.image} alt="User" />
                    )}
                    <Link
                      to={
                        notification.type === "post"
                          ? `/post/${notification.info_id}`
                          : notification.type === "profile"
                          ? `/profile/${notification.info_id}`
                          : "#"
                      }
                      className="notification-content">
                      <div className="notification-text">{notification.info}</div>
                      <span className="notification-date">
                        {notification.createdAt && formatDate(notification.createdAt)}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No notifications</div>
          )}
          <div className="text-right mt-4 cursor-pointer text-customPurple" onClick={markAllNotificationsAsRead}>
           Mark
            All as Read
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
