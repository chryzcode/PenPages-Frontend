import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const API_BASE_URL = "https://penpages-api.onrender.com/api/v1/";
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}user/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.user) {
          setUser(data["user"]);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
          navigate("/not-found");
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setIsLoading(false);
      }
    };

    const getUserPosts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}post/${username}/posts`);
        const data = await res.json();
        console.log(data);
        if (data.posts) {
          setPosts(data["posts"]);
        } else if (data.error) {
          console.log("error");
          toast.error(data.error);
        }
      } catch (error) {
        console.log("Error in fetching data:", error);
        toast.error("Failed to get data");
      } finally {
        setPostLoading(false);
      }

    }

    getUserPosts();
    fetchUserData();
  }, []); // Run only once when component mounts

  return (
    <>
      {isLoading ? (
        <h2>
          <Spinner size={100} color={"#6c63ff"} display={"block"} />
        </h2>
      ) : (
        <div className="container mx-auto my-8 text-center">
          {user && ( // Conditional rendering
            <div>
              <img className="w-52 h-52 object-contain mx-auto" src={user.imageCloudinaryUrl} alt="" />
              <h1 className="text-3xl py-2">
                {user.firstName} {user.lastName}
              </h1>
                <p className="font-semibold">@{user.username}</p>
                
                {/* <div>
                  {user.bio}
                </div> */}
            </div>
            // Render other user data here
          )}
        </div>
      )}
    </>
  );
};

export default ProfilePage;
