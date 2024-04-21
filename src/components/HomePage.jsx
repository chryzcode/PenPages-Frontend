import React from "react";
import addContentSVG from "../assets/images/add-content.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="block-container-center">
        <div className="home-page-content">
          <div>
            <h1>The all in one content creation platform!</h1>
            <p>Create your content seamlessly as a poet, blogger and author on PenPages.</p>
          </div>
          <Link to="/" className="home-page-btn">
            Get Started
          </Link>
          <img src={addContentSVG} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
