import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6  mx-10">
          {posts.map(post => (
            <Link to="" key={post._id} className="bg-white rounded-xl shadow-md relative">
              <div>
                <img src={post.imageCloudinaryUrl} alt="" />
              </div>

              <div className="py-3 px-5">
                <div className="text-gray-600 text-right text-sm">{post.type}</div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <div className="">
                  {/* {post.author} */}
                  chryz
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
