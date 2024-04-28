import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isAuthenticated }) => {
  return (
    <nav className="main-nav">
      <NavLink to="/">PenPages</NavLink>

      <span className="hidden sm:block text-md">
        <NavLink to="/posts" className="pr-6 hover:text-customPurple">
          Feeds
        </NavLink>
        <NavLink className="hover:text-customPurple">Explore</NavLink>
      </span>

      <span className=" text-md">
        {isAuthenticated ? (
          <NavLink to="/sign-out" className="pr-6 hover:text-customPurple">
            logout
          </NavLink>
        ) : (
          <NavLink to="/sign-in" className="pr-6 hover:text-customPurple">
            login
          </NavLink>
        )}

        {!isAuthenticated ? (
          <NavLink
            to="/sign-up"
            className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto">
            sign up
          </NavLink>
        ) : null}
      </span>
    </nav>
  );
};

export default Navbar;
