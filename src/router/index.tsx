import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import HomePage from "../pages/HomePage";
import ToDoList from "../pages/ToDoList";
import Album from "../pages/Album";
import Music from "../pages/Music";
import DiaryBook from "../pages/DiaryBook";
import ProtectedRoute from "../pages/components/ProtectedRoute";
import PublicRoute from "../pages/components/PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/ToDoList",
        element: <ToDoList />,
      },
      {
        path: "/albums",
        element: <Album />,
      },
      {
        path: "/journal",
        element: <DiaryBook />,
      },
      {
        path: "/music",
        element: <Music />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);
