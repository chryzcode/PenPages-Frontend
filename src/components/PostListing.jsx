import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostListing = ({ post }) => {
  const formatDate = dateString => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="bg-white rounded-xl shadow-md relative  py-5 px-6 text-gray-800">
      <div className="flex items-center justify-between pb-4">
        <Link to={`/profile/${post.author.username}`} className="flex items-center">
          <img className="w-8 mr-3" src={post.author.imageCloudinaryUrl} alt="" />
          <div>
            <div className="text-sm font-semibold">
              {post.author.firstName} {post.author.lastName}
            </div>
            <div className="text-xs">{post.author.username}</div>
          </div>
        </Link>

        <div className="text-sm font-thin">{post.type}</div>
      </div>

      <Link to={`/post/${post._id}`} className="flex  justify-between">
        <div className="">
          <h3 className="text-xl font-bold py-1">{post.title}</h3>
          <div className="text-sm">{post.body}</div>
        </div>
        <div className="flex justify-center items-center h-32 w-32">
          <img className="rounded-xl object-contain  w-full" src={post.image} alt="" />
        </div>
      </Link>

      <div className="flex  justify-between pt-6 text-sm">
        <div>{formatDate(post.createdAt)}</div>

        <div>{post.likes.length} likes</div>
      </div>
    </div>
  );
};

export default PostListing;
