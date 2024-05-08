import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const ProfileSettingsPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get("accessToken");
      try {
        const res = await fetch(`${API_BASE_URL}user/current-user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUserData(data["user"]);
        const { firstName, lastName, image, } = data.uswe;
        setFirstName(firstName);
        setLastName(lastName);
        setImage(image)
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run only once when component mounts

  const submitForm = async e => {
    e.preventDefault();
  };

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8">
          <h1>
            {userData.firstName} {userData.lastName}
          </h1>
          <div className="mx-10">
            <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Create Post</p>
            <div>
              <form onSubmit="">
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
                    name="firstName"
                    value={lastName}
                    onChange={e => {
                      setFirstName(e.target.value);
                    }}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="John"
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
                    onChange={e => {
                      setImage(e.target.value);
                    }}
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
                    Publish
                    {isLoading && <Spinner size={10} />}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth(ProfileSettingsPage);
