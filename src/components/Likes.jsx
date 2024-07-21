import React from 'react'
import { Link } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown} from "react-icons/fa6";

const Likes = ({like}) => {
  return (
    <Link
      className="flex items-center justify-center gap-2 align-center"
      to={`/profile/${like.user.username}`}>
      <img className="w-8" src={like.user.image} alt="" />
      <p>
        {like.user.firstName} {like.user.lastName}
      </p>
      <FaThumbsUp className="text-customPurple text-lg ml-7" />
    </Link>
  );
}

export default Likes