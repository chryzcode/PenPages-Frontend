import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const ReplyComment = ({ replyCommment }) => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [isEditing, setIsEditing] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [commentReplyLikes, setCommentReplyLikes] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [editedReply, setEditedReply] = useState(replyCommment.body);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const deleteReplyComment = async replyCommentId => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/reply/${replyCommentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.success || "Reply deleted successfully");
      } else {
        toast.error(data.error || "Failed to delete reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to delete reply");
    }
  };

  const updateComment = async (commentId, updatedBody) => {
    try {
      const res = await fetch(`${API_BASE_URL}comment/reply/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: updatedBody }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Reply updated successfully");
      } else {
        toast.error(data.error || "Failed to update reply");
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error("Failed to update reply");
    }
  };

  const handleDeleteClick = () => {
    deleteReplyComment(replyCommment._id);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedComment(replyCommment.body);
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

    getCommentReplyLikes(replyCommment._id);
  }, []);

  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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
            {loggedInUser ? <FaThumbsUp className="text-customPurple text-base cursor-pointer" /> : null}

            <div className="text-sm ">{commentReplyLikes.length} likes</div>
          </span>
          <span className="flex  items-center gap-2">
            {loggedInUser ? (
              <FaComment
                className="text-customPurple text-sm cursor-pointer"
                onClick={() => setIsReplying(!isReplying)} // Toggle the reply form visibility
              />
            ) : null}

            <div className="text-sm ">0 reply</div>
          </span>
        </div>

        {/* {isReplying && ( // Conditionally render the reply form
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
        )} */}
      </div>
    </div>
  );
};

export default ReplyComment;
