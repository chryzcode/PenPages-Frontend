import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpSVG from "../assets/images/sign-up.svg";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signUp = async newUser => {
    const res = await fetch("/api/user/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return res.json();
  };

  const submitForm = async e => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    // Call signUp function
    const data = await signUp(newUser);
    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(data.success);
      navigate("/");
    }
  };

  return (
    <div className="mx-10">
      <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Sign Up</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
        <div>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="firstName" className="block mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value);
                }}
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
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value);
                }}
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
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
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
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
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
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-customPurple text-center">
            <Link to=" ">Sign In</Link>
          </div>
        </div>

        <div>
          <img src={SignUpSVG} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
