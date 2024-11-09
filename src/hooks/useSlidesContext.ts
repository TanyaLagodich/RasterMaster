import { useContext } from "react";
import { SlidesContext } from "@/context/slidesContext";

export const useSlidesContext = () => {
    const slidesContext = useContext(SlidesContext);

    if (!slidesContext) {
        throw new Error(
            "useSlidesContext must be used within a SlideSContextProvider"
        );
    }

    return slidesContext;
};
