import React, { useState } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId, token } = useParams();

  const resetPassword = async userPassword => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}user/auth/forgot-password/${userId}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userPassword),
      });
      const data = await res.json();

      if (data.user) {
        toast.success("Password reset successfully");
        navigate("/sign-in");
      } else {
        toast.error(data.error || "Failed reset password");
      }
    } catch (error) {
      console.log("Error in reseting password", error);
      toast.error("Failed to reset passwoord");
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = e => {
    e.preventDefault();
    const userPassword = { password };
    resetPassword(userPassword);
  };

  return (
    <div className="mx-10">
      <p className="text-4xl text-customPurple font-semibold mx-auto text-center py-7">Reset Password</p>
      <div className="flex-wrap-container py-5 align-middle px-10">
        <div>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="email" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="*********"
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

export default ResetPasswordPage;
