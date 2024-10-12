import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { AppContextProvider } from "./context/appContext";
import { SlideContextProvider } from "./context/slideContext";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
    <AppContextProvider>
        <SlideContextProvider>
            <RouterProvider router={router} />
        </SlideContextProvider>
    </AppContextProvider>
);
