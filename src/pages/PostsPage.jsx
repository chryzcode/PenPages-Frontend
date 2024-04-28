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

  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="container mx-auto my-10">
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6   mx-2">
          {posts.map(post => (
            <div key={post._id} className="bg-white rounded-xl shadow-md relative  py-5 px-6 text-gray-800">
              <div className="flex items-center justify-between pb-4">
                <Link to="" className="flex items-center">
                  <img className="w-8 mr-3" src={post.author.imageCloudinaryUrl} alt="" />
                  <div>
                    <div className="text-sm font-semibold">
                      {post.author.firstName} {post.author.lastName}
                    </div>
                    <div className="text-xs">{post.author.username}</div>
                  </div>
                </Link>

                <div className="text-sm font-thin">{post.type}</div>
              </div>

              <Link to="" className="flex  justify-between">
                <div className="">
                  <h3 className="text-xl font-bold py-1">{post.title}</h3>
                  <div className="text-sm">{post.body}</div>
                </div>
                <div className="w-48">
                  <img className="rounded-xl" src={post.imageCloudinaryUrl} alt="" />
                </div>
              </Link>

              <div className="flex  justify-between pt-6 text-sm">
                <div>{formatDate(post.createdAt)}</div>

                <div>5 likes</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
