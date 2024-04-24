import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpSVG from "../assets/images/sign-up.svg";

const SignUpPage = ({ addUserSubmit }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();

  const submitForm = e => {
    e.preventDefault();
    const newUser = {
      firstName,
      lastName,
      email,
      username,
      password,
    };
    addUserSubmit(newUser);
    toast.success("Signed up successfully");
    return navigate("/");
  };
  return (
    <div className="my-10 mx-10">
      <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Sign Up</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
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

          <div className="mx-auto w-32 my-10">
            <button
              className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
              type="submit">
              Sign Up
            </button>
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
