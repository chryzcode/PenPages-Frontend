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
  const [tags, setTags] = useState([]);
  const [type, setType] = useState("");

  const handleImageChange = e => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}tag`);
        const data = await res.json();
        setAllTags(data.tags);
      } catch (error) {
        toast.error("Failed to get tags");
      }
    };

    const getPost = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${postId}`);
        const data = await res.json();
        if (data.error) {
          toast.error("Post does not exist");
        } else if (data.post) {
          const { title, body, tag, type } = data.post;
          setTitle(title);
          setBody(body);
          setType(type);
          setTags(tag.map(t => t._id)); // Ensure tags are set as ObjectIds
          setPost(data.post);
        }
      } catch (error) {
        console.log("Error fetching post:", error);
        toast.error("Failed to get post");
      } finally {
        setIsLoading(false);
      }
    };

    getTags();
    getPost();
  }, [postId]);

  const editPost = async updatedPost => {
    const formData = new FormData();
    formData.append("title", updatedPost.title);
    formData.append("body", updatedPost.body);
    formData.append("type", updatedPost.type);

    // Append tags as an array
    updatedPost.tags.forEach(tag => formData.append("tag[]", tag));

    if (updatedPost.image) {
      formData.append("image", updatedPost.image);
    }

    try {
      const res = await fetch(`${API_BASE_URL}post/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else if (data.post) {
        toast.success("Post updated successfully");
        navigate(`/post/${data.post._id}`);
      }
    } catch (error) {
      console.log("Error updating post:", error);
      toast.error("Failed to update post");
    } finally {
      setIsLoading(false);
    }
  };

  const submitForm = async e => {
    e.preventDefault();
    setIsLoading(true);
    const updatedPost = {
      title,
      body,
      tags,
      type,
      image: image, // If no image is selected, this will be `null`
    };
    editPost(updatedPost);
  };

  return (
    <div className="mx-10">
      {isLoading ? (
        <Spinner size={100} color={"#6c63ff"} display={"block"} />
      ) : (
        <div>
          <p className="text-4xl text-customPurple font-semibold mx-auto text-center py-7">Edit Post</p>
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
              {post?.image && <p>Current image exists</p>}
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
