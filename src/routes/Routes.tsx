import Main from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

export default routes;
