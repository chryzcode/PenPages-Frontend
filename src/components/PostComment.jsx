import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Auth from "./Auth";
import { json } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
const PostComment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const token = Cookies.get("accessToken");
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    const getPostComments = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}comment/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else if (data.comments) {
          setComments(data.comments);
        }
      } catch (error) {
        console.log("error....", error);
        toast.error("Failed to fetch post comments");
      }
    };
    const createComment = async newComment => {
      try {
        const res = await fetch(`${API_BASE_URL}comment/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newComment),
        });
        const data = await res.json();
        if (data.error) {
          toast.error(data.error);
        } else if (data.comment) {
          toast.success("Comment successfully added");
        }
      } catch (error) {
        console.log("error....", error);
        toast.error("Failed to post comment");
      }
    };

    getPostComments();
  }, []);

  const submitForm = async e => {
    e.preventDefault();
    const newComment = {
      commentBody,
    };
    createComment(newComment);
  };

  return (
    <div>
      <div className="mx-10">
        <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Comments</p>
        <div>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="body" className="block mb-2 text-left">
                Comment
              </label>
              <input
                type="text"
                id="body"
                name="body"
                value={commentBody}
                onChange={e => {
                  setCommentBody(e.target.value);
                }}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Nice post"
                required
              />
            </div>

            <div className="mx-auto w-32 my-8 text-center">
              <button
                className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                type="submit">
                Comment
                {/* {isLoading && <Spinner size={10} />} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth(PostComment);
