import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import "./index.css";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";

function App() {
  const signUp = async newUser => {
    const res = await fetch("/api/user/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/sign-up" element={<SignUpPage signUpSubmit={signUp} />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
