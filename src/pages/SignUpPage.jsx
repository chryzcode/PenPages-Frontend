import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SignUpSVG from "../assets/images/sign-up.svg";
import Spinner from "../components/Spinner";

const SignUpPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const signUp = async newUser => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}user/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        navigate("/");
        toast.success(data.success);
      }
    } catch (error) {
      console.log("Error signing up:", error);
      toast.error("Failed to sign up");
    } finally {
      setIsLoading(false);
    }
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

    signUp(newUser);
  };

  return (
    <div className="mx-10">
      <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Sign Up</p>
      <p className="text-center">
        Already have an account?{" "}
        <a href="/sign-in" className="text-customPurple hover:underline">
          Sign in
        </a>
      </p>
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
                Sign Up {isLoading && <Spinner size={10} />}
              </button>
            </div>
          </form>
        </div>

        <div>
          <img src={SignUpSVG} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
