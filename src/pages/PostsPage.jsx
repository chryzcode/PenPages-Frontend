import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const PostsPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setPosts(data["allPosts"]);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, []);
  return (
    <div className="container mx-auto my-10">
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow-md relative">
              <div className="">
                <div className="text-gray-600 text-right">{post.type}</div>
                <img src={post.imageCloudinaryUrl} alt="" />

                <h3 className="text-indigo-500 mb-2">{post.tag}</h3>

                <div className="">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <div className="text-orange-700 mb-3">{post.author}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
