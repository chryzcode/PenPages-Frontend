import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import ReplyComment from "./ReplyComment";

const Comments = ({ commentId, comment, onUpdate, onDelete }) => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [replyCommentBody, setReplyCommentBody] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [commentReplies, setCommentReplies] = useState([]);
  const [commentLikes, setCommentLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(comment.body);
  };

  const handleSaveClick = () => {
    onUpdate(commentId, editedComment);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    onDelete(commentId);
  };

  const replyComment = async (replyCommentId, replyCommentBody) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}comment/reply/${replyCommentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
        body: JSON.stringify({ body: replyCommentBody }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reply added successfully");
        setReplyCommentBody(""); // Clear the input field
        setIsReplying(false); // Hide the reply form after successful reply
      } else {
        toast.error(data.error || "Failed to add reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to add reply");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getCommentLikes = async commentId => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}comment/like/${commentId}`);
        const data = await res.json();
        if (res.ok) {
          setCommentLikes(data.commentLikes);
        } else {
          toast.error(data.error || "Failed to get comment likes");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to get comment likes");
      } finally {
        setIsLoading(false);
      }
    };

    const getCommentReplies = async commentId => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}comment/reply/${commentId}`);
        const data = await res.json();
        if (res.ok) {
          setCommentReplies(data.replycomments);
        } else {
          toast.error(data.error || "Failed to add reply");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to add reply");
      } finally {
        setIsLoading(false);
      }
    };

    getCommentReplies(commentId);
    getCommentLikes(commentId);
  }, []);

  const likeComment = async commentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/like/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer $${loggedInUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Comment liked");
        setLiked(true);
      } else {
        toast.error(data.error || "Failed to like comment");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to like comment");
    }
  };

  const unlikeComment = async commentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/unlike/${commentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Comment unliked");
        setLiked(false);
      } else {
        toast.error(data.error || "Failed to unlike comment");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to unlike comment");
    }
  };

  const onLikeClick = () => {
    if (liked) {
      unlikeComment(commentId);
    } else {
      likeComment(commentId);
    }
  };

  const submitReplyForm = async e => {
    e.preventDefault();
    replyComment(commentId, replyCommentBody);
  };

  return (
    <div className="my-2">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${comment.user.username}`} className="flex items-center">
          <img
            className="w-9 mr-1"
            src={comment.user.imageCloudinaryUrl}
            alt={`${comment.user.firstName} ${comment.user.lastName}`}
          />
          <span className="text-sm font-semibold">
            {`${comment.user.firstName} ${comment.user.lastName}`}
            <p className="text-xs font-extralight text-left">{formatDate(comment.updatedAt || comment.createdAt)}</p>
          </span>
        </Link>
        {loggedInUser && loggedInUser._id === comment.user._id ? (
          <div className="text-sm">
            {!isEditing ? (
              <>
                <span className="pr-2 cursor-pointer" onClick={handleEditClick}>
                  Edit
                </span>
                <span className="cursor-pointer" onClick={handleDeleteClick}>
                  Delete
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="w-full border rounded p-2 my-2"
            value={editedComment}
            onChange={e => setEditedComment(e.target.value)}
          />
          <div className="text-right text-sm">
            <span className="pr-2 cursor-pointer" onClick={handleSaveClick}>
              Save
            </span>
            <span className="cursor-pointer" onClick={handleCancelClick}>
              Cancel
            </span>
          </div>
        </div>
      ) : (
        <p className="text-left text-sm py-2">{comment.body}</p>
      )}

      <div>
        <div className="flex items-center gap-4">
          <span className="flex  items-center gap-2">
            {loggedInUser ? (
              <Link onClick={onLikeClick}>
                {liked ? (
                  <FaThumbsDown className="text-customPurple text-lg" />
                ) : (
                  <FaThumbsUp className="text-customPurple text-lg" />
                )}
              </Link>
            ) : null}

            <div className="text-sm ">{commentLikes.length} likes</div>
          </span>
          <span className="flex  items-center gap-2">
            {loggedInUser ? (
              <FaComment
                className="text-customPurple text-sm cursor-pointer"
                onClick={() => setIsReplying(!isReplying)} // Toggle the reply form visibility
              />
            ) : null}

            <div className="text-sm ">{commentReplies.length} reply</div>
          </span>
        </div>
        <div>
          {commentReplies.map(reply => (
            <ReplyComment key={reply._id} replyCommment={reply} />
          ))}
        </div>

        {isReplying && ( // Conditionally render the reply form
          <div className="text-left">
            <div>
              <form onSubmit={submitReplyForm}>
                <div className="my-3">
                  <label htmlFor="body" className="block mb-2 text-left text-sm">
                    Reply Comment
                  </label>
                  <input
                    type="text"
                    id="body"
                    name="body"
                    value={replyCommentBody}
                    onChange={e => setReplyCommentBody(e.target.value)}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Reply comment"
                    required
                  />
                </div>

                <div className="ml-auto w-32 my-2 text-right">
                  <button
                    className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 text-sm rounded-full focus:outline-none focus:shadow-outline w-auto"
                    type="submit">
                    Reply
                    {isLoading && <Spinner size={10} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
