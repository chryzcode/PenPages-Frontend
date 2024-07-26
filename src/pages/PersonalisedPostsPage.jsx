import React from "react";
import PersonalisedPostListings from "../components/PersonalisedPostListings";
import Auth from "../components/Auth";

const PersonalisedPostsPage = () => {
  return (
    <>
      <PersonalisedPostListings />
    </>
  );
};

export default Auth(PersonalisedPostsPage);
