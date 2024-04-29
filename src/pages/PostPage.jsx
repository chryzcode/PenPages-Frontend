import React, { useState, useEffect } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";
import CurrentUserAuthor from "../utils/CurrentUserAuthor";

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
  const [isAuthor, setIsAuthor] = useState(false);

  

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error("Post does not exist");
        } else if (data.post) {
          setPost(data.post);
          const author = await CurrentUserAuthor(data.post.author._id);
          if (author) {
            setIsAuthor(true);
          }
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
      <div className="container mx-auto my-8">
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
                <div className="flex sm:flex-2 items-center justify-center gap-10 py-5 align-center ">
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

                {isAuthor ? (
                  <div>
                    <p>Edit</p>
                    <p>Delete</p>
                  </div>
                ) : null}

                <div className="text-left my-8">
                  <p>{post.body}</p>
                </div>

                <div className="flex tems-center justify-center gap-10 py-5 align-center">
                  <p>
                    {/* {post.likes.map(like => (
                      <p>{like._id}</p>
                    ))} */}
                    {post.likes.length} Likes
                  </p>
                  <p>3 Comments</p>
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
