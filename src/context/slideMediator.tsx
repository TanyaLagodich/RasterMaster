import { createContext, useRef, useState, useEffect } from 'react';
import { SlideMediator } from '@/mediator';
import { Slide as SlideType, SlideMediatorContextType  } from '@/types';
import { SlideFactory } from '@/factories/slide';

export const SlideMediatorContext = createContext<SlideMediatorContextType | null>(null);

export const SlideMediatorProvider = ({ children }) => {
    const [slides, setSlides] = useState<SlideType[]>([]);
    const [currentSlide, setCurrentSlide] = useState<SlideType | null>(null);

    const reconstructSlide = (slideData: any): SlideType => {
        return Object.assign(SlideFactory.createSlide(), slideData);
    }

    useEffect(() => {
        const storedSlides = localStorage.getItem('slides');
        if (storedSlides) {
            setSlides(JSON.parse(storedSlides).map((slide) => reconstructSlide(slide)));
        }
    
        const storedCurrentSlide = localStorage.getItem('currentSlide');
        if (storedCurrentSlide) {
            setCurrentSlide(reconstructSlide(JSON.parse(storedCurrentSlide)));
        }
    }, []);

    const mediatorRef = useRef<SlideMediator | null>(null);

    if (!mediatorRef.current) {
        mediatorRef.current = new SlideMediator();
        mediatorRef.current.registerSlideList(setSlides);
        mediatorRef.current.registerCurrentSlide(setCurrentSlide);
    }

    mediatorRef.current.setSlidesList(slides);

    useEffect(() => {
        localStorage.setItem('slides', JSON.stringify(slides));
    }, [slides]);

    useEffect(() => {
        if (currentSlide) {
            localStorage.setItem('currentSlide', JSON.stringify(currentSlide));
        } else {
            localStorage.removeItem('currentSlide');
        }
    }, [currentSlide]);

    return (
        <SlideMediatorContext.Provider value={{ mediator: mediatorRef.current, slides, currentSlide }}>
            {children}
        </SlideMediatorContext.Provider>
    );
};
