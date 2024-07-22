import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const forgotPassword = async userEmail => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}user/send-forgot-password-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEmail),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Check your mail");
        navigate("/");
      } else {
        toast.error("Failed to send mail");
      }
    } catch (error) {
      console.log("Error in sending mail", error);
      toast.error("Failed to send mail");
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = e => {
    e.preventDefault();
    const userEmail = { email };
    forgotPassword(userEmail);
  };

  return (
    <div className="mx-10">
      <p className="text-4xl text-customPurple font-semibold mx-auto text-center py-7">Forgot Password?</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
        <div>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="email" className="block mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="JDoe or johndoe@gmail.com"
                required
              />
            </div>
            <div className="mx-auto w-32 my-8 text-center">
              <button
                disabled={isLoading}
                className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                type="submit">
                Submit {isLoading && <Spinner size={10} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
