import React from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";

const Navbar = ({ isAuthenticated, userData }) => {
  return (
    <nav className="main-nav">
      <NavLink to="/">PenPages</NavLink>

      <span className="hidden sm:block space-x-4">
        <NavLink to="/posts" className=" hover:text-customPurple">
          Feeds
        </NavLink>
        {/* {isAuthenticated ? (
          <>
            <NavLink to="/personalised/posts" className="pr-6 hover:text-customPurple">
              Personalised post
            </NavLink>
            <NavLink to="/create-post" className="pr-6 hover:text-customPurple">
              Create post
            </NavLink>
          </>
        ) : null} */}
        <NavLink className=" hover:text-customPurple">Explore</NavLink>
      </span>

      <span>
        {isAuthenticated ? (
          <>
            <NavLink className=" relative">
              {userData.firstName}
              <IoMdArrowDropdown className="inline-flex" />
            </NavLink>

            <ul className="absolute hidden py-2 mt-2  rounded-lg p-5 ">
              <li>
                <a href={`/profile/${userData.username}`}>Profile</a>
              </li>
              <li>
                <a href="/profile">Settings</a>
              </li>
              <li>
                <a href="/sign-out">Logout</a>
              </li>
            </ul>
          </>
        ) : (
          <>
            <NavLink to="/sign-in" className="pr-6 hover:text-customPurple">
              login
            </NavLink>

            <NavLink
              to="/sign-up"
              className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto">
              sign up
            </NavLink>
          </>
        )}
      </span>
    </nav>
  );
};

export default Navbar;
