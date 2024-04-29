import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";

const PostPage = () => {
  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const navigate = useNavigate();
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
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
      {" "}
      <div className="container mx-auto my-10">
        {isLoading ? (
          <h2>
            <Spinner size={100} color={"#6c63ff"} display={"block"} />
          </h2>
        ) : (
          <div className="w-9/12 mx-auto text-center">
            {post ? (
              <div>
                <img src={post.imageCloudinaryUrl} alt="" />
                <h2 className="text-4xl font-bold py-3">{post.title}</h2>
                <div className="flex items-center justify-center space-x-10 py-5 align-center justify-items-center">
                  <div className="flex items-center">
                    <img className="w-8 mr-3" src={post.author.imageCloudinaryUrl} alt="" />
                    <p>
                      {" "}
                      {post.author.firstName} {post.author.lastName}
                    </p>
                  </div>
                  <p>{formatDate(post.createdAt)}</p>
                  <p>{post.type}</p>
                </div>
              </div>
            ) : (
              <NotFoundPage url={"/posts"} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
