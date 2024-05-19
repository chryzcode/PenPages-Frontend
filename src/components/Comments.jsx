import React from 'react'
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaComment } from "react-icons/fa6";

const Comments = ({comment}) => {
  return (
    <div  className="my-2">
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
  );
}

export default Comments