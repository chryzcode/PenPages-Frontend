import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const PostPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        setPost(data["post"]);
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
      {" "}
      <div className="container mx-auto my-10">
        {isLoading ? (
          <h2>
            <Spinner size={100} color={"#6c63ff"} display={"block"} />
          </h2>
        ) : (
          <div className=" mx-2">{post.title}</div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
