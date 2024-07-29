import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Auth from "../components/Auth";

const AddPostPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [allTags, setAllTags] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("article");
  const [isLoading, setIsLoading] = useState(false);

  if (!token) {
    navigate("/sign-in");
  }

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}tag`);
        const data = await res.json();
        setAllTags(data["tags"]);
      } catch (error) {
        toast.error("Failed to get data");
      }
    };

    getTags();
  }, []);

  const addPost = async newPost => {
    try {
      const res = await fetch(`${API_BASE_URL}post`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: newPost,
      });
      const data = await res.json();
      if (data.error) {
        console.log("Error adding post:", data.error);
        toast.error("Failed to publish post");
      } else if (data.post) {
        toast.success("Post published successfully");
        navigate(`/post/${data.post._id}`);
      }
    } catch (error) {
      console.log("Error adding post:", error);
      toast.error("Failed to publish post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = e => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("type", type);
    tags.forEach(tag => formData.append("tag[]", tag)); // Append tags as an array
    if (image) {
      formData.append("image", image);
    }
    addPost(formData);
  };

  return (
    <div className="mx-10">
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          <p className="text-4xl text-customPurple font-semibold mx-auto text-center py-7">Add New Post</p>
          <form onSubmit={submitForm}>
            <div className="my-3">
              <label htmlFor="title" className="block mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Introduction to Node.js"
                required
              />
            </div>

            <div className="my-3">
              <label htmlFor="image" className="block mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="border rounded w-full py-2 px-3 mb-2"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="tag" className="block mb-2">
                Tag
              </label>
              <select
                multiple
                id="tag"
                name="tag"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={tags}
                onChange={e => setTags(Array.from(e.target.selectedOptions, option => option.value))}>
                {allTags.map(tag => (
                  <option value={tag._id} key={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block mb-2">
                Type
              </label>
              <select
                id="type"
                name="type"
                className="border rounded w-full py-2 px-3 mb-2"
                required
                value={type}
                onChange={e => setType(e.target.value)}>
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="poem">Poem</option>
              </select>
            </div>

            <div className="my-3">
              <label htmlFor="body" className="block mb-2">
                Body
              </label>
              <textarea
                className="border rounded w-full py-2 px-3 mb-2"
                type="text"
                name="body"
                value={body}
                id="body"
                cols="30"
                rows="10"
                onChange={e => setBody(e.target.value)}
                placeholder="....."
                required></textarea>
            </div>

            <div className="mx-auto w-32 my-8 text-center">
              <button
                className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                type="submit">
                Publish
                {isLoading && <Spinner size={10} />}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth(AddPostPage);
