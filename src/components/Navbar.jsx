import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="main-nav">
      <div>PenPages</div>

      <span className="nav-links text-xl">
        <NavLink className="pr-6">Feeds</NavLink>
        <NavLink>Explore</NavLink>
      </span>

      <span className="nav-links text-xl">
        <NavLink className="pr-6">login</NavLink>
        <NavLink to={"/sign-up"} className=" bg-customPurple py-1 px-3 text-white rounded-full text-lg">
          sign up
        </NavLink>
      </span>
    </nav>
  );
};

export default Navbar;
