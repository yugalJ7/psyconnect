import "./style.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Components/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: user ? <Home /> : <Register />,
        },
        {
          path: "/login",
          loader: () => (user ? redirect("/") : <Login />),
          element: <Login />,
        },
        {
          path: "/profile/:username",
          element: <Profile />,
        },
        {
          path: "/register",
          element: user ? <Home /> : <Register />,
        },
      ])}
    />
  );
}

export default App;
