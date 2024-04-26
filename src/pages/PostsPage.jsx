import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const PostsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    };
  });
  return <div>PostsPage</div>;
};

export default PostsPage;
