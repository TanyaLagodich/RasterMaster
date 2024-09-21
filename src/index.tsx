import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { AppContextProvider } from "./context/appContext";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
    <AppContextProvider>
        <RouterProvider router={router} />
    </AppContextProvider>
);
