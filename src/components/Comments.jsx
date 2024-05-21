import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa6";
import { toast } from "react-toastify";
import Spinner from "./Spinner"; // Assuming Spinner is a component you use for loading state

const Comments = ({ commentId, comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [isLoading, setIsLoading] = useState(false);
  const [replyCommentBody, setReplyCommentBody] = useState("");

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
      {loggedInUser ? (
        <div>
          <div className="flex items-center gap-2">
            <FaThumbsUp className="text-customPurple text-base cursor-pointer" />
            <FaComment className="text-customPurple text-sm cursor-pointer" />
          </div>

          <div className="mx-10">
            <p className="text-2xl text-customPurple font-semibold mx-auto text-center py-7">Reply comment</p>
            <div>
              <form onSubmit={submitReplyForm}>
                <div className="my-3">
                  <label htmlFor="body" className="block mb-2 text-left">
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

                <div className="mx-auto w-32 my-8 text-center">
                  <button
                    className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                    type="submit">
                    Reply
                    {isLoading && <Spinner size={10} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
