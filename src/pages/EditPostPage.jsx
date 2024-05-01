import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Auth from "../components/Auth";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          toast.error("Post does not exist");
        } else if (data.post) {
          setPost(data.post);
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </div>
      ) : (
        <div>{post.title}</div>
      )}
    </div>
  );
};

export default Auth(EditPostPage);
