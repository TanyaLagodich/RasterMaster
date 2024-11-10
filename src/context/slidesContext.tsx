import { createContext, ReactNode, useState, useContext } from "react";
import { Slide, SlideTypes } from '@/types';
import { SlideFactory  } from '@/factories/slide';

export type SlidesContextType = {
    slides: Slide[];
    currentSlide: Slide;
    setCurrentSlide: (currentSlide: Slide) => void;
    currentSlideId: string | null;
    setCurrentSlideId: (id: string) => void;
    addSlide: (slide: Slide) => void;
    removeSlide: (id: string) => Slide;
    updateSlide: (updatedSlide: Slide) => void;
    updateCurrentSlide: (updatedSlide: Slide) => void;
    changeSlide: (slide: Slide) => void;
};

export const SlidesContext = createContext<SlidesContextType | null>(null);

export const SlidesContextProvider = ({ children }: { children: ReactNode }) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlideId, setCurrentSlideId] = useState<string | null>(null);
    const [currentSlide, setCurrentSlide] = useState<Slide>(null);

    function addSlide(newSlide: Slide) {
        setSlides((prev) => [...prev, newSlide]);
        setCurrentSlideId(newSlide.id);
        setCurrentSlide(newSlide);
    }

    function removeSlide(id: string) {
      let removedSlide: Slide | undefined;
   
       setSlides((prev) => {
           removedSlide = prev.find((slide) => slide.id === id);
           return prev.filter((slide) => slide.id !== id);
       });
   
       if (currentSlideId === id) {
           setCurrentSlideId(null);
       }
   
       return removedSlide;
    }

    function updateSlide(updatedSlide: Slide) {
        setSlides((prev) =>
            prev.map((slide) => (slide.id === updatedSlide.id ? updatedSlide : slide))
        );
    }

    function updateCurrentSlide(updatedSlide: Slide) {
        setCurrentSlide(updatedSlide);
    }

    function changeSlide(slide: Slide) {
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
