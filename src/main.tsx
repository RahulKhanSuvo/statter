import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import routes from "./routes/Routes.tsx";
import ReduxProvider from "./redux/provider/ReduxProvider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <RouterProvider router={routes} />
      <Toaster />
    </ReduxProvider>
  </StrictMode>,
);
