import { createBrowserRouter } from "react-router-dom";

import { App } from "./app";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: (
            <div className={"w-full h-full flex justify-center items-center"}>
                Something went wrong
            </div>
        ),
    },
]);
