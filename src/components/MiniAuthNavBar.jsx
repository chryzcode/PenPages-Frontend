import React from "react";
import { NavLink } from "react-router-dom";

const MiniAuthNavBar = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <div className="container mx-auto my-8 px-4 text-center md:flex md:justify-center">
          <NavLink
            to="/personalised/posts"
            className="block mb-4 md:mb-0 md:mr-6 hover:text-customPurple text-base md:text-lg">
            Personalised posts
          </NavLink>
          <NavLink to="/create-post" className="block hover:text-customPurple text-base md:text-lg">
            Create post
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

export default MiniAuthNavBar;
