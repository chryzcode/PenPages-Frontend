import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Auth from "../components/Auth";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const EditPostPage = () => {
  const navigate = useNavigate();
  const token = Cookies.get("accessToken");
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allTags, setAllTags] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [type, setType] = useState("");

  // Function to handle file input change
  const handleImageChange = e => {
    const selectedImage = e.target.value; // Get the selected image file
    setImage(selectedImage); // Set the selected image file to state
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}tag`);
        const data = await res.json();
        setAllTags(data["tags"]);
      } catch (error) {
        console.log("Errorr....", error);
        toast.error("Failed to get data");
      }
    };

    getTags();
    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error("Post does not exist");
        } else if (data.post) {
          const { title, image, body, tag, type } = data.post;
          setTitle(title);
          setImage(image);
          setBody(body);
          setType(type);
          setTag(tag.map(tag => tag.name));
          setPost(data.post);
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };
    getPost();
  }, []);

  const editPost = async updatePost => {
    try {
      const res = await fetch(`${API_BASE_URL}post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatePost),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else if (data.post) {
        toast.success("Post updated published");
        setIsLoading(true);
        navigate(`/post/${data.post._id}`);
      }
    } catch (error) {
      console.log("Errorrr....", error);
      toast.error("Failed to publish post");
    }
  };

  const submitForm = async e => {
    e.preventDefault();
    const updatePost = {
      title,
      image,
      body,
      tag,
      type,
    };
    editPost(updatePost);
  };

  return (
    <div className="mx-10">
      {isLoading ? (
        <div>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </div>
      ) : (
        <div>
          <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Edit Post</p>
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
                onChange={e => {
                  setTitle(e.target.value);
                }}
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
                accept="image/*" // Accept only image files
                onChange={handleImageChange} // Call function on file input change
                className="border rounded w-full py-2 px-3 mb-2"
                required
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
                value={tag}
                onChange={e => setTag(Array.from(e.target.selectedOptions, option => option.value))}>
                {allTags.map(tag => (
                  <option value={tag.name} key={tag._id}>
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
                onChange={e => {
                  setBody(e.target.value);
                }}
                placeholder="....."
                required></textarea>
            </div>

            <div className="mx-auto w-32 my-8 text-center">
              <button
                className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                type="submit">
                Update
                {isLoading && <Spinner size={10} />}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Auth(EditPostPage);
