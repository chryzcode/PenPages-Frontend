import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp, FaComment } from "react-icons/fa6";

const Comments = ({ commentId, comment, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment.body);
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

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
        {loggedInUser && loggedInUser._id == comment.user._id ? (
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
        <div className="flex items-center gap-2">
          <FaThumbsUp className="text-customPurple text-base cursor-pointer" />
          <FaComment className="text-customPurple text-sm cursor-pointer" />
        </div>
      ) : null}
    </div>
  );
};

export default Comments;
