import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NotFoundPage from "./NotFoundPage";
import CurrentUserAuthor from "../utils/CurrentUserAuthor";
import Cookies from "js-cookie";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import { FaEdit, FaCommentAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import getCurrentUserData from "../utils/CurrentUserData";
import PostComment from "../components/PostComment";
import Comments from "../components/Comments";
import Likes from "../components/Likes";

const PostPage = () => {
  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const token = Cookies.get("accessToken");
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [likeOpen, setLikeOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const toggleLikes = () => {
    setLikeOpen(!likeOpen);
  };

  const toggleComments = () => {
    setCommentOpen(!commentOpen);
  };

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
        setLikes(prevLikes => [...prevLikes, { user: { _id: loggedInUser._id } }]);
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
        setLikes(prevLikes => prevLikes.filter(like => like.user._id !== loggedInUser._id));
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Post deleted successfully");
        navigate("/posts");
      } else {
        toast.error(data.error || "Failed to delete post");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete post");
    }
  };

  const updateComment = async (commentId, updatedBody) => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: updatedBody }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Comment updated successfully");
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.map(comment =>
            comment._id === commentId ? { ...comment, body: updatedBody, updatedAt: new Date().toISOString() } : comment
          ),
        }));
      } else {
        toast.error(data.error || "Failed to update comment");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to update comment");
    }
  };

  const deleteComment = async commentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.success || "Comment deleted successfully");
        setPost(prevPost => ({
          ...prevPost,
          comments: prevPost.comments.filter(comment => comment._id !== commentId),
        }));
      } else {
        toast.error(data.error || "Failed to delete comment");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete comment");
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
          <div className="md:px-10 px-4 mx-auto text-center">
            {post ? (
              <div>
                <img className="w-60 h-60 object-contain mx-auto" src={post.image} alt="" />
                <h2 className="text-4xl font-bold py-3">{post.title}</h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-5">
                  <Link to={`/profile/${post.author.username}`} className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-3" src={post.author.image} alt="" />
                    <p>
                      {post.author.firstName} {post.author.lastName}
                    </p>
                  </Link>
                  <p>{post.updatedAt ? formatDate(post.updatedAt) : formatDate(post.createdAt)}</p>
                  <p>{post.type}</p>
                </div>

                {isAuthor ? (
                  <div className="flex items-center justify-center gap-5">
                    <Link
                      to={`/post/${post._id}/edit`}
                      className="flex items-center justify-center hover:underline hover:text-customPurple">
                      {" "}
                      <FaEdit className="text-customPurple" /> Edit
                    </Link>
                    <Link
                      onClick={onDeleteClick}
                      className="flex items-center justify-center hover:underline hover:text-customPurple">
                      {" "}
                      <MdDelete className="text-customPurple" /> Delete
                    </Link>
                  </div>
                ) : null}

                <div className="text-left my-8">
                  <p>{post.body}</p>
                </div>

                <div className="flex items-center justify-center flex-col">
                  {likes.map(like => (
                    <p className="flex items-center py-3" key={like._id}>
                      <img className="w-10 mr-3 rounded-full" src={like.user.image} alt="" />
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

                    <span onClick={toggleLikes} className="cursor-pointer">
                      {" "}
                      {likesCount} Likes
                    </span>
                  </div>

                  <p onClick={toggleComments} className="cursor-pointer flex items-center gap-2">
                   <FaCommentAlt className="text-customPurple"/> {post.comments.length} Comments
                  </p>
                </div>
                <div className={`${likeOpen ? "block" : "hidden"}`}>
                  {likes.map(like => (
                    <Likes key={like._id} like={like} />
                  ))}
                </div>

                <div className={`${commentOpen ? "flex gap-2 w-10/12 mx-auto my-5  flex-col" : "hidden"} `}>
                  {post.comments.map(comment => (
                    <Comments
                      key={comment._id}
                      commentId={comment._id}
                      comment={comment}
                      onUpdate={updateComment}
                      onDelete={deleteComment}
                    />
                  ))}
                </div>
                {authenticated ? <PostComment postId={postId} /> : null}
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
