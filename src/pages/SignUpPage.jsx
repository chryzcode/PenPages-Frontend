import React from "react";
import SignUpSVG from "../assets/images/sign-up.svg";

const SignUpPage = () => {
  return (
    <div className="my-10 mx-10">
      <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Sign Up</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
        <div>
          <img src={SignUpSVG} />
        </div>

        <div>
          <form action="">
            <div className="my-3">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="John"
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="lastName" className="block mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Doe"
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="email" className="block mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="johndoe@gmail.com"
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Jdoe"
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="*********"
                required
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
