import React from "react";
import { NavLink } from "react-router-dom";

const MiniAuthNavBar = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated ? (
        <div>
          <NavLink to="/personalised/posts" className="pr-6 hover:text-customPurple">
            Personalised post
          </NavLink>
          <NavLink to="/create-post" className="pr-6 hover:text-customPurple">
            Create post
          </NavLink>
        </div>
      ) : null}
    </>
  );
};

export default MiniAuthNavBar;
