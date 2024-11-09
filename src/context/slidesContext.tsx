import { createContext, ReactNode, useState, useContext } from "react";
import { nanoid } from "nanoid";
import { SlideContextType } from "./slideContext";

type SlidesContextType = {
    slides: SlideContextType[];
    currentSlide: SlideContextType;
    setCurrentSlide: (currentSlide: SlideContextType) => void;
    currentSlideId: string | null;
    setCurrentSlideId: (id: string) => void;
    addSlide: () => void;
    removeSlide: (e, id: string) => void;
    updateSlide: (updatedSlide: SlideContextType) => void;
    updateCurrentSlide: (updatedSlide: SlideContextType) => void;
    changeSlide: (slide: SlideContextType) => void;
};

export const SlidesContext = createContext<SlidesContextType | null>(null);

export const SlidesContextProvider = ({ children }: { children: ReactNode }) => {
    const [slides, setSlides] = useState<SlideContextType[]>([]);
    const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState<SlideContextType>(null);

    function addSlide() {
        const newSlide: SlideContextType = {
            id: nanoid(),
            preview: '',
            nodes: [],
            editorDimensions: { width: 0, height: 0 },
            zIndex: { max: 0, min: 0 },
            selectedNode: null,
        };
        setSlides((prev) => [...prev, newSlide]);
        setCurrentSlideId(newSlide.id);
        setCurrentSlide(newSlide);
    }

    function removeSlide(id: string) {
        setSlides((prev) => prev.filter((slide) => slide.id !== id));
        if (currentSlideId === id) {
            setCurrentSlideId(null);
        }
    }

    function updateSlide(updatedSlide: SlideContextType) {
        setSlides((prev) =>
            prev.map((slide) => (slide.id === updatedSlide.id ? updatedSlide : slide))
        );
    }

    function updateCurrentSlide(updatedSlide: SlideContextType) {
        setCurrentSlide(updatedSlide);
    }

    function changeSlide(slide: SlideContextType) {
        setCurrentSlide(slide);
    }

    return (
        <SlidesContext.Provider
            value={{
                slides, currentSlide, setCurrentSlide, currentSlideId, setCurrentSlideId, addSlide, removeSlide, updateSlide, changeSlide, updateCurrentSlide }}
        >
            {children}
        </SlidesContext.Provider>
    );
};
