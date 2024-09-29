import { useContext } from "react";
import { AppContext } from "../context/appContext";

export const useAppContext = () => {
    const appContext = useContext(AppContext);

    if (!appContext) {
        throw new Error(
            "useAppContext must be used within an AppContextProvider"
        );
    }

    return appContext;
};
