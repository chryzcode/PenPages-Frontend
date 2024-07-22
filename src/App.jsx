import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "../src/styles/index.css";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SignOutPage from "./pages/SignOutPage";
import PostsPage from "./pages/PostsPage";
import PostPage from "./pages/PostPage";
import AddPostPage from "./pages/AddPostPage";
import EditPostPage from "./pages/EditPostPage";
import PersonalisedPostListings from "./components/PersonalisedPostListings";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import FollowersFollowingPage from "./pages/FollowersFollowingPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/not-found" element={<NotFoundPage url={"/"} />} />
          <Route path="/settings" element={<ProfileSettingsPage />} />
          <Route path="/sign-out" element={<SignOutPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/personalised/posts" element={<PersonalisedPostListings />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/create-post" element={<AddPostPage />} />
          <Route path="/post/:postId/edit" element={<EditPostPage />} />
          <Route path="/:username/followings" element={<FollowersFollowingPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage url={"/"} />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
