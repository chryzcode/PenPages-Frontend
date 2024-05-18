import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";
import CurrentUserAuthor from "../utils/CurrentUserAuthor";
import Cookies from "js-cookie";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa6";
import getCurrentUserData from "../utils/CurrentUserData";
import PostComment from "../components/PostComment";

const PostPage = () => {
  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const API_BASE_URL = "http://localhost:5000/api/v1/";
  const token = Cookies.get("accessToken");
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const getPostLikes = async postId => {
    try {
      const res = await fetch(`${API_BASE_URL}post/like/${postId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching post likes:", error);
      return { likes: [] };
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error("Post does not exist");
        } else if (data.post) {
          setPost(data.post);
          const likesData = await getPostLikes(data.post._id);
          setLikes(likesData.likes);
          setLikesCount(likesData.likes.length);
          const currentUserData = await getCurrentUserData();
          if (currentUserData) {
            setAuthenticated(true);
            setLiked(likesData.likes.some(like => like.user._id === currentUserData._id));
          }
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
  }, [postId]);

  const likePost = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}post/like/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Post liked");
        setLikes(prevLikes => [...prevLikes, { user: { _id: "currentUserId" } }]); // Dummy user data
        setLikesCount(prevCount => prevCount + 1);
        setLiked(true);
      } else {
        toast.error(data.error || "Failed to like post");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to like post");
    }
  };

  const unlikePost = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}post/unlike/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Post unliked");
        setLikes(prevLikes => prevLikes.filter(like => like.user._id !== "currentUserId")); // Dummy user data
        setLikesCount(prevCount => prevCount - 1);
        setLiked(false);
      } else {
        toast.error(data.error || "Failed to unlike post");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to unlike post");
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}post/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Correcting header name
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Post deleted successfully");
        navigate("/posts");
      } else {
        toast.error(data.error || "Failed to delete post"); // Display server error message if available
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete post");
    }
  };

  const onLikeClick = () => {
    if (liked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const onDeleteClick = () => {
    const confirm = window.confirm("Are you sure you want to delete this post?");
    if (!confirm) return;
    deletePost();
  };

  return (
    <div>
      <div className="container mx-auto my-8">
        {isLoading ? (
          <h2>
            <Spinner size={100} color={"#6c63ff"} display={"block"} />
          </h2>
        ) : (
          <div className="w-9/12 mx-auto text-center">
            {post ? (
              <div>
                <img className="w-60 h-60 object-contain mx-auto" src={post.imageCloudinaryUrl} alt="" />
                <h2 className="text-4xl font-bold py-3">{post.title}</h2>
                <div className="flex sm:flex-2 items-center justify-center gap-10 py-5 align-center ">
                  <Link to={`/profile/${post.author.username}`} className="flex items-center">
                    <img className="w-8 mr-3" src={post.author.imageCloudinaryUrl} alt="" />
                    <p>
                      {post.author.firstName} {post.author.lastName}
                    </p>
                  </Link>
                  <p>{formatDate(post.createdAt)}</p>
                  <p>{post.type}</p>
                </div>

                {isAuthor ? (
                  <div className="flex items-center justify-center gap-5">
                    <Link to={`/post/${post._id}/edit`}>Edit</Link>
                    <Link onClick={onDeleteClick}>Delete</Link>
                  </div>
                ) : null}

                <div className="text-left my-8">
                  <p>{post.body}</p>
                </div>

                <div className="flex items-center justify-center flex-col">
                  {likes.map(like => (
                    <p className="flex items-center py-3" key={like._id}>
                      <img className="w-8 mr-3" src={like.user.imageCloudinaryUrl} alt="" />
                      {like.user.firstName} {like.user.lastName}
                    </p>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-10 py-5 align-center">
                  <div className="flex items-center justify-center gap-2 align-center">
                    {authenticated ? (
                      <>
                        <Link onClick={onLikeClick}>
                          {liked ? (
                            <FaThumbsDown className="text-customPurple text-lg" />
                          ) : (
                            <FaThumbsUp className="text-customPurple text-lg" />
                          )}
                        </Link>
                      </>
                    ) : null}
                    {likesCount} Likes
                  </div>

                  <p>{post.comments.length} Comments</p>
                </div>
                <div>
                  {likes.map(like => (
                    <Link
                      key={like._id}
                      className="flex items-center justify-center gap-2 align-center"
                      to={`/profile/${like.user.username}`}>
                      <img className="w-8" src={like.user.imageCloudinaryUrl} alt="" />
                      <p>
                        {like.user.firstName} {like.user.lastName}
                      </p>
                      <FaThumbsUp className="text-customPurple text-lg ml-7" />
                    </Link>
                  ))}
                </div>

                <div className="flex gap-2 w-10/12 mx-auto my-5  flex-col">
                  {post.comments.map(comment => (
                    <div key={comment._id} className="my-2">
                      <div className="flex  items-center justify-between">
                        <Link to={`/profile/${comment.user.username}`} className="flex items-center">
                          <img className="w-8 mr-1" src={comment.user.imageCloudinaryUrl} alt="" />
                          <span className="text-xs font-semibold">
                            {" "}
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                        </Link>

                        <div className="text-sm">
                          <span className="pr-2">Edit</span>
                          <span>Delete</span>
                        </div>
                      </div>

                      <p className="text-left text-sm py-2">{comment.body}</p>

                      <div className="flex align-middle items-center gap-2">
                        <FaThumbsUp className="text-customPurple text-base" />
                        <FaComment className="text-customPurple text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
                <PostComment postId={postId} />
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
