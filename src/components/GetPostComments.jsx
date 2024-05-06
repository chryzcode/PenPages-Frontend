import React, { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { toast } from "react-toastify";


const GetPostComments = ({postId}) => {
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
    
  useEffect(() => {
    const getPostComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}comment/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else if (data.comments) {
          setComments(data.comments);
          setCommentsLoading(false);
        }
      } catch (error) {
        console.log("error....", error);
        toast.error("Failed to fetch post comments");
      }
    };

    getPostComments();
  }, []);
  return <div>GetPostComments</div>;
};

export default GetPostComments;
