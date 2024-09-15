import { createBrowserRouter, redirect } from "react-router-dom";

import { App } from "./app";
import { MainScreen } from "./screens/main-screen";

export const routes = {
    root: {
        path: "/",
    },
    main: {
        path: "main",
        getUrl: () => "/main",
    },
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: (
            <div className={"w-full h-full flex justify-center items-center"}>
                Something went wrong
            </div>
        ),
        children: [
            { index: true, loader: () => redirect(routes.main.getUrl()) },
            {
                path: routes.main.getUrl(),
                element: <MainScreen />,
            },
        ],
    },
]);
