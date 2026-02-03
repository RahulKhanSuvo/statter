
import Main from "@/layouts/Main";
import Home from "@/pages/Home/Home";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import { createBrowserRouter } from "react-router";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            }
        ]
    }
])

export default routes