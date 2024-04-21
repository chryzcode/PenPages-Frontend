import React from "react";
import addContentSVG from "../assets/images/add-content.svg";
import publishArticleSVG from "../assets/images/publish-article.svg";
import contentStructureSVG from "../assets/images/content-structure.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="mx-10">
      <div className="text-center max-w-3xl mx-auto">
        <div>
          <p className="text-5xl my-10 font-semibold">
            The <span className="text-customPurple">three in one</span> content creation
            <span className="text-customPurple"> platform</span>!
          </p>
          <p className="text-2xl my-14 max-w-xl mx-auto">
            Create your content seamlessly as a poet, blogger and author on PenPages.
          </p>
          <Link className="text-xl bg-customPurple py-3 px-6 text-white rounded-full" to="/">
            Get Started
          </Link>
          <img className=" mx-auto my-16 home-page-image-size" src={addContentSVG} />
        </div>
      </div>

      <div className="text-center mt-32">
        <p className="text-4xl  font-semibold max-w-xl  mx-auto">
          <span className="text-customPurple">Publish</span> your poem, article and e-book{" "}
          <span className="text-customPurple">at a go</span>.
        </p>

        <div className="flex-wrap-container py-20 align-middle">
          <div className="text-center mx-auto">
            <p className="text-3xl font-bold max-w-xl mx-auto">
              <span className="text-customPurple">No</span> content, niche and audience
              <span className="text-customPurple"> limitation</span>!
            </p>
            <div>
              <div className="text-left text-xl list-disc custom-list py-10 mx-auto w-4/5 pl-10">
                <li className="py-2">Share you knowledge in whatever field.</li>
                <li className="py-2">No usage cost(free).</li>
                <li className="py-2">No genre limitation.</li>
                <li className="py-2">More content reach and audience.</li>
              </div>
            </div>
          </div>

          <div className="mx-auto">
            <img className="home-page-image-size mx-auto" src={publishArticleSVG} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-4xl  font-semibold mx-auto">
          The <span className="text-customPurple">TRIO</span> content platform.
        </p>

        <div className="flex-wrap-container py-20">
          <div className="mx-auto w-6/12">
            <img className=" w-6/12 mx-auto" src={contentStructureSVG} />
          </div>

          <div className="text-center mx-auto">
            <p className="text-3xl font-bold max-w-xl mx-auto">
              <span className="text-customPurple">Seamless</span> user experience
            </p>
            <ul className="text-left text-xl list-disc custom-list py-10 mx-auto w-4/5 pl-10">
              <li className="py-2">Sign up with just a few clicks.</li>
              <li className="py-2">Same text editor for different content.</li>
              <li className="py-2">Interactive comment/ reply system.</li>
              <li className="py-2">High content search engine optimization (SEO).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
