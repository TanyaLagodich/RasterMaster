import { createContext, useRef, useState, useEffect } from 'react';
import { SlidesList, SlidesListItem, buildUpSlidesList } from '@/mediator';
import { Slide as SlideType, SlideMediatorContextType  } from '@/types';
import { SlideFactory } from '@/factories/slide';

export const SlideMediatorContext = createContext<SlideMediatorContextType | null>(null);

export const SlideMediatorProvider = ({ children }) => {
    const [slides, setSlides] = useState<SlideType[]>([]);
    const [currentSlide, setCurrentSlide] = useState<SlideType | null>(null);

    const reconstructSlide = (slideData: any): SlideType => {
        return Object.assign(SlideFactory.createSlide(), slideData);
    }

    const mediatorRef = useRef<SlidesList | null>(null);

    useEffect(() => {
        const storedSlides = localStorage.getItem('slides');
        if (storedSlides) {
            setSlides(JSON.parse(storedSlides).map((slide) => reconstructSlide(slide)));
        }
    
        const storedCurrentSlide = localStorage.getItem('currentSlide');
        if (storedCurrentSlide) {
            setCurrentSlide(reconstructSlide(JSON.parse(storedCurrentSlide)));
        }

        if (mediatorRef && storedSlides && storedCurrentSlide) {
            mediatorRef.current = buildUpSlidesList({
                slides: JSON.parse(storedSlides).map((slide) => reconstructSlide(slide)),
                currentSlide: reconstructSlide(JSON.parse(storedCurrentSlide)),
                setSlides,
                setCurrentSlide,
            })
        }
    }, []);

    if (!mediatorRef.current) {
        mediatorRef.current = new SlidesList();
        mediatorRef.current.registerSlideList(setSlides);
        mediatorRef.current.registerCurrentSlide(setCurrentSlide);
        mediatorRef.current.setSlides(slides);
        mediatorRef.current.setCurrentSlide(currentSlide);
    }

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

