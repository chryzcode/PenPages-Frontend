import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="main-nav">
      <NavLink to="/">PenPages</NavLink>

      <span className="nav-links text-xl">
        <NavLink className="pr-6">Feeds</NavLink>
        <NavLink>Explore</NavLink>
      </span>

      <span className="nav-links text-xl">
        <NavLink to="/sign-in" className="pr-6">
          login
        </NavLink>
        <NavLink
          to="/sign-up"
          className="bg-customPurple hover:bg-indigo-600 text-lg font-semibold text-white py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto">
          sign up
        </NavLink>
      </span>
    </nav>
  );
};

export default Navbar;
