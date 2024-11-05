import { useContext } from "react";
import { SlideActionsContext } from "../context/slideContext";

export const useSlideActionsContext = () => {
    const slideActionsContext = useContext(SlideActionsContext);

    if (!slideActionsContext) {
        throw new Error(
            "useSlideActionsContext must be used within an SlideContextProvider"
        );
    }

    return slideActionsContext;
};
