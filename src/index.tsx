import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { AppContextProvider } from "./context/appContext";
import "./index.scss";
import { SlidesContextProvider } from "@/context/slidesContext";
import { SlideContextProvider } from "@/context/slideContext";

createRoot(document.getElementById("root")!).render(
    <AppContextProvider>
        <SlidesContextProvider>
            <SlideContextProvider>
                <RouterProvider router={router} />
            </SlideContextProvider>
        </SlidesContextProvider>
    </AppContextProvider>
);
