import React from "react";
import getCurrentUserData from "../utils/CurrentUserData";

const CurrentUserAuthor = async userId => {
  // Get current user data
  const currentUserData = await getCurrentUserData();

  // If current user data is not available, return false
  if (!currentUserData) {
    return false;
  }

  // Compare current user ID with the post author ID
  return currentUserData._id === userId;
};

export default CurrentUserAuthor;
