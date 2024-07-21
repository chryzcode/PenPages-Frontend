import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdArrowDropdown, IoIosNotifications } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import Notifications from "./Notifications";

const Navbar = ({ isAuthenticated, userData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="main-nav flex justify-between items-center p-4 bg-white shadow-md relative">
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

      <div className="hidden sm:flex items-center space-x-4">
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
            {/* <NavLink to="/sign-in" className="pr-6 hover:text-customPurple">
              login
            </NavLink> */}

            <NavLink
              to="/sign-up"
              className="bg-customPurple hover:bg-indigo-600 text-sm font-semibold text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto">
              sign up
            </NavLink>
          </>
        )}
      </div>

      <div className="sm:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-2xl text-customPurple focus:outline-none">
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg z-10 p-4 pl-10 sm:hidden">
          <NavLink to="/posts" className="block py-2 hover:text-customPurple">
            Feeds
          </NavLink>
          <NavLink to="/explore" className="block py-2 hover:text-customPurple">
            Explore
          </NavLink>
          {isAuthenticated ? (
            <>
              <div className="relative py-2">
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

              <div className="relative py-2">
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
              {/* <NavLink to="/sign-in" className="block py-2 hover:text-customPurple">
                login
              </NavLink> */}
              <NavLink to="/sign-up" className="block py-2 hover:text-customPurple">
                sign up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
