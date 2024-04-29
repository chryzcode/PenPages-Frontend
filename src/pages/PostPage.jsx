import React, { useState, useEffect } from "react";

const PostPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async ({ params }) => {
      const id = params.jobId;
      try {
        const res = await fetch(`${API_BASE_URL}post/${id}`);
        const data = await res.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    getPost();
  }, []);

  return <div>PostPage</div>;
};

export default PostPage;
