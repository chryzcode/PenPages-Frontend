import React, { useEffect, useState } from "react";
import Auth from "../components/Auth";
import Cookies from "js-cookie";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProfileSettingsPage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateIsLoading, setUpdateIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const token = Cookies.get("accessToken");
  const [updatePasswordIsLoading, setUpdatePasswordIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
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
        const { firstName, lastName, image, bio, username } = data.user;
        setFirstName(firstName);
        setLastName(lastName);
        setImage(image);
        setBio(bio);
        setUsername(username);
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []); // Run only once when component mounts

  const updateUser = async updatedUser => {
    try {
      setUpdateIsLoading(true);
      const res = await fetch(`${API_BASE_URL}user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        setUserData(data.user);
      }
    } catch (error) {
      console.log("Errorrr....", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdateIsLoading(false);
    }
  };

  const updatePassword = async updatedPassword => {
    try {
      setUpdatePasswordIsLoading(true);
      const res = await fetch(`${API_BASE_URL}user/update/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedPassword),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        setCurrentPassword("");
        setNewPassword("");
        toast.success(data.success);
      }
    } catch (error) {
      console.log("Errorrr....", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdatePasswordIsLoading(false);
    }
  };

  const deactivateUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}user/delete`, {
        method: "DELETE",
        headers: {
          "Type-Content": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else if (data.success) {
        toast.success(data.success);
        navigate("/");
      }
    } catch (error) {
      console.log("error......", error);
      toast.error("Failed to deactivate account");
    }
  };

  const onClickDeactivate = () => {
    const confirm = window.confirm("Are you sure you want to deactivate this account?");
    if (!confirm) return;
    deactivateUser();
  };

  const submitForm = async e => {
    e.preventDefault();
    const updatedUser = {
      firstName,
      lastName,
      // image,
      bio,
      username,
      currentPassword,
      newPassword,
    };
    updateUser(updatedUser);
  };

  const submitPasswordForm = async e => {
    e.preventDefault();
    const updatedPassword = {
      currentPassword,
      newPassword,
    };
    updatePassword(updatedPassword);
  };

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8">
          <div className="mx-10">
            <p className="text-4xl text-customPurple  font-semibold mx-auto text-center py-7">Edit Profile</p>
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
                    name="firstName"
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
                    placeholder="Doe"
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
                    // accept="image/*" // Accept only image files
                    // value={image}
                    onChange={e => {
                      setImage(e.target.value);
                    }}
                    className="border rounded w-full py-2 px-3 mb-2"
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="bio" className="block mb-2">
                    Bio
                  </label>
                  <textarea
                    className="border rounded w-full py-2 px-3 mb-2"
                    type="text"
                    name="bio"
                    value={bio}
                    id="bio"
                    cols="30"
                    rows="10"
                    onChange={e => {
                      setBio(e.target.value);
                    }}
                    placeholder="....."></textarea>
                </div>

                <div className="mx-auto w-32 my-8 text-center">
                  <button
                    className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                    type="submit">
                    Update {updateIsLoading && <Spinner size={10} />}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <p className="text-3xl text-customPurple  font-semibold mx-auto text-center py-7">Update Password</p>
              <form onSubmit={submitPasswordForm}>
                <div className="my-3">
                  <label htmlFor="currentPassword" className="block mb-2">
                    Current Password
                  </label>
                  <input
                    type="text"
                    id="currentPassword"
                    name="currentPassword"
                    value={currentPassword}
                    onChange={e => {
                      setCurrentPassword(e.target.value);
                    }}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="********"
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="newPassword" className="block mb-2">
                    New Password
                  </label>
                  <input
                    type="text"
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={e => {
                      setNewPassword(e.target.value);
                    }}
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="********"
                  />
                </div>
                <div className="mx-auto w-32 my-8 text-center">
                  <button
                    className="bg-customPurple hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-auto"
                    type="submit">
                    Update {updatePasswordIsLoading && <Spinner size={10} />}
                  </button>
                </div>
              </form>
            </div>

            <button
              onClick={onClickDeactivate}
              className=" bg-red-500 hover:bg-red-600 text-sm  text-white py-2 px-4 focus:outline-none focus:shadow-outline block ml-auto">
              Deactivate account
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth(ProfileSettingsPage);
