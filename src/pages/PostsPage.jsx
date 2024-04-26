import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const PostsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      const getPosts = async () => {
        const res = await fetch("/api/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setPosts(data["allPosts"]);
      };
      getPosts();
    } catch (error) {
      console.error("Error in fetching data:", error);
      toast.error("Failed to get data");
    } finally {
      setIsLoading(false);
    }
  }, []);
  console.log(posts);
  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div>
          {posts.map(post => (
            <p>{post.title}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default PostsPage;
