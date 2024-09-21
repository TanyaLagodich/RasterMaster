import { Suspense } from "react";
import { Spinner } from "./components/spinner";
import { Outlet } from "react-router-dom";

export function App() {
    return (
        <Suspense
            fallback={
                <div
                    className={"w-full h-full flex justify-center items-center"}
                >
                    <Spinner />
                </div>
            }
        >
            <div className={"h-[100vh] w-full"}>
                <Outlet />
            </div>
        </Suspense>
    );
}
