import React from "react";
import addContentSVG from "../assets/images/add-content.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="mx-10">
      <div className="text-center max-w-3xl mx-auto">
        <div>
          <p className="text-5xl my-10 font-semibold">
            The <span className="text-customPurple">all in one</span> content creation platform!
          </p>
          <p className="text-2xl my-10 max-w-xl mx-auto">
            Create your content seamlessly as a poet, blogger and author on PenPages.
          </p>
          <Link className="text-xl bg-customPurple py-3 px-6 text-white rounded-full" to="/">
            Get Started
          </Link>
          <img className="w-1.2 mx-auto my-10" src={addContentSVG} />
        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto my-20">
        <p className="text-4xl my-10 font-semibold">
          Publish your poem, article and e-book <span className="text-customPurple">at a go</span>.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
