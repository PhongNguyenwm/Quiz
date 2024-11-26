import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import DashBoard from "./components/Admin/Content/DashBoard";
import ManageUser from "./components/Admin/Content/ManageUser";
import Login from "./components/Auth/Login";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";

const NotFound = () => {
  return (
    <div className="container mt-3 alert alert-danger">
      404. Page not found!
    </div>
  );
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "users",
          element: <ListQuiz />,
        },
      ],
    },
    {
      path: "quiz/:id",
      element: <DetailQuiz />,
    },
    {
      path: "admins",
      element: <Admin />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "manage-users", element: <ManageUser /> },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
  {
    future: {
      v7_skipActionStatusRevalidation: true,
    },
  }
);

const Layout = (props) => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Layout;
