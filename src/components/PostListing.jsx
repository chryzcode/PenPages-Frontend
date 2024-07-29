import React from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";

const PostListing = ({ post }) => {
  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white rounded-xl shadow-md relative py-5 px-6 text-gray-800">
      <div className="flex items-center justify-between pb-4">
        <Link to={`/profile/${post.author.username}`} className="flex items-center">
          <img
            className="w-10 mr-3 rounded-full"
            src={post.author.image}
            alt={`${post.author.firstName} ${post.author.lastName}`}
          />
          <div>
            <div className="text-sm font-semibold">
              {post.author.firstName} {post.author.lastName}
            </div>
            <div className="text-xs">@{post.author.username}</div>
          </div>
        </Link>

        <div className="text-sm font-thin">{post.type}</div>
      </div>

      <Link to={`/post/${post._id}`} className="flex justify-between">
        <div className="flex-1 pr-4">
          <h3 className="text-xl font-bold py-1">{post.title}</h3>
          <div className="text-sm line-clamp-2">{post.body}</div>
        </div>
        <div className="flex-none w-32 h-32 overflow-hidden rounded-xl">
          <img className="object-cover w-full h-full" src={post.image} alt={post.title} />
        </div>
      </Link>

      <div className="flex justify-between pt-6 text-sm">
        <div>{formatDate(post.createdAt)}</div>
        <div className="flex justify-center align-middle items-center gap-1"><FaThumbsUp className="text-customPurple"/>{post.likes.length} likes</div>
      </div>
    </div>
  );
};

export default PostListing;
