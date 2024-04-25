import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import signInSVG from "../assets/images/sign-in.svg";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async user => {
    const res = await fetch("/api/user/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return res.json();
  };

  const submitForm = async e => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const data = await signIn(user);
    if (data.error) {
      toast.error(data.error);
    } else {
      const token = data.token;
      Cookies.set("accessToken", token, { expires: 2 }); // Set cookie to expire after 2 days
      toast.success(data.success);
      navigate("/current-user");
    }
  };

  return (
    <div className="mx-10">
      <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Sign In</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
        <div>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="email" className="block mb-2">
                Email / Username
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="JDoe or johndoe@gmail.com"
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
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="*********"
                required
              />
            </div>

            <div className="mx-auto w-32 my-8 text-center">
              <button
                className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                type="submit">
                Sign In
              </button>
            </div>
          </form>
          <div className="text-customPurple text-center">
            <Link to=" ">Forgot password</Link>
          </div>
        </div>

        <div>
          <img src={signInSVG} />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
