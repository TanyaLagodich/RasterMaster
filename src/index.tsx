import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router";
import { AppContextProvider } from "./context/appContext";
import "./index.scss";
import { SlideContextProvider } from "@/context/slideContext";
import { SlideMediatorProvider } from '@/context/slideMediator';

createRoot(document.getElementById("root")!).render(
    <AppContextProvider>
      <SlideMediatorProvider>
          <SlideContextProvider>
              <RouterProvider router={router} />
          </SlideContextProvider>
      </SlideMediatorProvider>
    </AppContextProvider>
);
