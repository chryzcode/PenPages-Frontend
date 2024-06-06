import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoIosNotifications } from "react-icons/io";
import Notifications from "./Notifications";

const Navbar = ({ isAuthenticated, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="main-nav">
      <NavLink to="/">PenPages</NavLink>

      <span className="hidden sm:block space-x-4">
        <NavLink to="/posts" className="hover:text-customPurple">
          Feeds
        </NavLink>

        <NavLink to="/explore" className="hover:text-customPurple">
          Explore
        </NavLink>
      </span>

      <span className="flex">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <IoIosNotifications
                className="inline mr-2 text-xl text-customPurple cursor-pointer"
                onClick={toggleNotifications}
              />
              {showNotifications && (
                <div className="absolute right-0 top-8 w-72 bg-white shadow-lg rounded-lg z-10">
                  <Notifications />
                </div>
              )}
            </div>

            <span onClick={toggleDropdown} className="cursor-pointer relative">
              {userData.firstName}
              <IoMdArrowDropdown className="inline-flex" />
            </span>

            <ul className={`absolute ${isOpen ? "block" : "hidden"} py-2 mt-2 rounded-lg p-5 bg-white shadow-lg`}>
              <li className="hover:text-customPurple">
                <a href={`/profile/${userData.username}`}>Profile</a>
              </li>
              <li className="hover:text-customPurple">
                <a href="/settings">Settings</a>
              </li>
              <li className="hover:text-customPurple">
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
