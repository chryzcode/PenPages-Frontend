import React from "react";

const Navbar = () => {
  return (
    <nav className="main-nav">
      <div className="flex-container">
        <div>PenPages</div>

        <span className="nav-links">
          <span>login</span>
          <span>sign up</span>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
