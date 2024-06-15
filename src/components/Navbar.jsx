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
    <nav className="main-nav flex justify-between items-center p-4 bg-white shadow-md">
      <NavLink to="/" className="text-xl font-bold text-customPurple">
        PenPages
      </NavLink>

      <div className="hidden sm:flex space-x-4">
        <NavLink to="/posts" className="hover:text-customPurple">
          Feeds
        </NavLink>
        <NavLink to="/explore" className="hover:text-customPurple">
          Explore
        </NavLink>
      </div>

      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <div className="relative">
              <IoIosNotifications
                className="inline mr-2 text-2xl text-customPurple cursor-pointer"
                onClick={toggleNotifications}
              />
              {showNotifications && (
                <div className="absolute right-0 top-8 w-80 bg-white shadow-lg rounded-lg z-10 p-4">
                  <Notifications />
                </div>
              )}
            </div>

            <div className="relative">
              <span onClick={toggleDropdown} className="cursor-pointer flex items-center space-x-2">
                <span className="text-sm font-medium">{userData.firstName}</span>
                <IoMdArrowDropdown className="text-xl" />
              </span>

              {isOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <NavLink to={`/profile/${userData.username}`} className="block text-sm">
                      Profile
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <NavLink to="/settings" className="block text-sm">
                      Settings
                    </NavLink>
                  </li>
                  <li className="hover:bg-gray-100 px-4 py-2">
                    <NavLink to="/sign-out" className="block text-sm">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
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
      </div>
    </nav>
  );
};

export default Navbar;
