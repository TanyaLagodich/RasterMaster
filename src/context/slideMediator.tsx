import { createContext, useRef, useState } from 'react';
import { SlideMediator } from '@/mediator';
import { Slide,SlideMediatorContextType  } from '@/types';

export const SlideMediatorContext = createContext<SlideMediatorContextType | null>(null);

export const SlideMediatorProvider = ({ children }) => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [currentSlide, setCurrentSlide] = useState<Slide | null>(null);

    const mediatorRef = useRef<SlideMediator | null>(null);

    if (!mediatorRef.current) {
        mediatorRef.current = new SlideMediator();
        mediatorRef.current.registerSlideList(setSlides);
        mediatorRef.current.registerCurrentSlide(setCurrentSlide);
    }

    mediatorRef.current.setSlidesList(slides);

    return (
        <SlideMediatorContext.Provider value={{ mediator: mediatorRef.current, slides, currentSlide }}>
            {children}
        </SlideMediatorContext.Provider>
    );
};

