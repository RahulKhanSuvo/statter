
import Main from "@/layouts/Main";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])

export default routes