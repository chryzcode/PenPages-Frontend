import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Auth from "./Auth";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
const PostComment = ({ postId }) => {
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const createComment = async newComment => {
      try {
        const res = fetch(`${API_BASE_URL}comment/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newComment),
        });
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else if (data.comment) {
          toast.success("Comment successfully added");
        }
      } catch (error) {
        console.log("error....", error);
        toast.error("Failed to post comment");
      }
    };

    createComment();
  }, []);

  return <div>PostComment</div>;
};

export default Auth(PostComment);
