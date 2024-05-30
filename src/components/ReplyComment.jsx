import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const ReplyComment = ({ replyCommment, onUpdateReply, onDeleteReply }) => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [isEditing, setIsEditing] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [commentReplyLikes, setCommentReplyLikes] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [editedReply, setEditedReply] = useState(replyCommment.body);
  const [replyCommentBody, setReplyCommentBody] = useState("");
  const [commentReplies, setCommentReplies] = useState([]);
  const [liked, setLiked] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const updateComment = async (commentId, updatedBody) => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/reply/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
        body: JSON.stringify({ body: updatedBody }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reply updated successfully");
        onUpdateReply(commentId, updatedBody);
      } else {
        toast.error(data.error || "Failed to update reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to update reply");
    }
  };

  const handleDeleteClick = () => {
    onDeleteReply(replyCommment._id);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedReply(replyCommment.body);
  };

  const handleSaveClick = () => {
    updateComment(replyCommment._id, editedReply);
    setIsEditing(false);
  };

  useEffect(() => {
    const getCommentReplyLikes = async replyCommentId => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}comment/like/reply/${replyCommentId}`);
        const data = await res.json();
        if (res.ok) {
          setCommentReplyLikes(data.replyCommentLikes);
        } else {
          toast.error(data.error || "Failed to get reply likes");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to get reply likes");
      } finally {
        setIsLoading(false);
      }
    };

    const getCommentReplies = async replyCommentId => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}comment/reply/${replyCommentId}`);
        const data = await res.json();
        if (res.ok) {
          setCommentReplies(data.replycomments);
        } else {
          toast.error(data.error || "Failed to get replies");
        }
      } catch (error) {
        console.log("Error:", error);
        toast.error("Failed to get replies");
      } finally {
        setIsLoading(false);
      }
    };

    getCommentReplies(replyCommment._id);
    getCommentReplyLikes(replyCommment._id);

    // Restore liked state from localStorage
    const likedReplies = JSON.parse(localStorage.getItem("likedReplies")) || [];
    if (likedReplies.includes(replyCommment._id)) {
      setLiked(true);
    }
  }, [replyCommment._id]);

  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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
        setCommentReplies(prevReplies => [...prevReplies, data.reply]); // Update the replies state
        // Save comment replies to localStorage
        const storedReplies = JSON.parse(localStorage.getItem("replies")) || {};
        storedReplies[replyCommment._id] = [...(storedReplies[replyCommment._id] || []), data.reply];
        localStorage.setItem("replies", JSON.stringify(storedReplies));
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

  const submitReplyForm = async e => {
    e.preventDefault();
    replyComment(replyCommment._id, replyCommentBody);
  };

  const likeReply = async replyCommentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/like/reply/${replyCommentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reply liked");
        setLiked(true);
        setCommentReplyLikes(prevLikes => [...prevLikes, loggedInUser]); // Update the likes state
        // Save liked state to localStorage
        const likedReplies = JSON.parse(localStorage.getItem("likedReplies")) || [];
        likedReplies.push(replyCommentId);
        localStorage.setItem("likedReplies", JSON.stringify(likedReplies));
      } else {
        toast.error(data.error || "Failed to like reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to like reply");
    }
  };

  const unlikeReply = async replyCommentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/unlike/reply/${replyCommentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reply unliked");
        setLiked(false);
        setCommentReplyLikes(prevLikes => prevLikes.filter(like => like._id !== loggedInUser._id)); // Update the likes state
        // Remove liked state from localStorage
        const likedReplies = JSON.parse(localStorage.getItem("likedReplies")) || [];
        const updatedLikedReplies = likedReplies.filter(id => id !== replyCommentId);
        localStorage.setItem("likedReplies", JSON.stringify(updatedLikedReplies));
      } else {
        toast.error(data.error || "Failed to unlike reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to unlike reply");
    }
  };

  const onLikeClick = () => {
    if (liked) {
      unlikeReply(replyCommment._id);
    } else {
      likeReply(replyCommment._id);
    }
  };

  return (
    <div className="my-2 ml-10">
      <div className="flex items-center justify-between">
        <Link to={`/profile/${replyCommment.user.username}`} className="flex items-center">
          <img
            className="w-9 mr-1"
            src={replyCommment.user.imageCloudinaryUrl}
            alt={`${replyCommment.user.firstName} ${replyCommment.user.lastName}`}
          />
          <span className="text-sm font-semibold">
            {`${replyCommment.user.firstName} ${replyCommment.user.lastName}`}
            <p className="text-xs font-extralight text-left">
              {formatDate(replyCommment.updatedAt || replyCommment.createdAt)}
            </p>
          </span>
        </Link>
        {loggedInUser && loggedInUser._id === replyCommment.user._id ? (
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
            value={editedReply}
            onChange={e => setEditedReply(e.target.value)}
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
        <p className="text-left text-sm py-2">{replyCommment.body}</p>
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

            <div className="text-sm ">{commentReplyLikes.length} likes</div>
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

export default ReplyComment;
