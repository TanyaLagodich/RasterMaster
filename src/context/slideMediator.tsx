import { createContext, useRef, useState, useEffect } from 'react';
import { SlidesList, buildUpSlidesList } from '@/mediator';
import { Slide as SlideType, SlideMediatorContextType  } from '@/types';
import { SlideFactory } from '@/factories/slide';
import { initDB, saveToDB, loadFromDB, deleteFromDB, clearDB } from '@/utils/initDB';

export const SlideMediatorContext = createContext<SlideMediatorContextType | null>(null);

export const SlideMediatorProvider = ({ children }) => {
    const [slides, setSlides] = useState<SlideType[]>([]);
    const [currentSlide, setCurrentSlide] = useState<SlideType | null>(null);

    const reconstructSlide = (slideData: any): SlideType => {
        return Object.assign(SlideFactory.createSlide(), slideData);
    }

    const mediatorRef = useRef<SlidesList | null>(null);
    const dbRef = useRef<IDBDatabase | null>(null);

    useEffect(() => {
        initDB()
            .then((db) => {
                dbRef.current = db;

                // Загрузка слайдов из IndexedDB
                return Promise.all([
                    loadFromDB(db, 'slides'),
                    loadFromDB(db, 'currentSlide'),
                ]);
            })
            .then(([storedSlides, storedCurrentSlide]) => {
                const slides = storedSlides.map((slide) => reconstructSlide(slide));
                setSlides(() => slides);

                if (storedCurrentSlide.length > 0) {
                    setCurrentSlide(() => reconstructSlide(storedCurrentSlide[0]));
                }

                // Инициализация Mediator
                if (mediatorRef && slides && storedCurrentSlide.length > 0) {
                    mediatorRef.current = buildUpSlidesList({
                        slides,
                        currentSlide: currentSlide || reconstructSlide(storedCurrentSlide[0]),
                        setSlides,
                        setCurrentSlide,
                    });
                }
            })
            .catch((error) => {
                console.error('Failed to initialize IndexedDB', error);
            });
        // const storedSlides = localStorage.getItem('slides');
        // if (storedSlides) {
        //     setSlides(JSON.parse(storedSlides).map((slide) => reconstructSlide(slide)));
        // }
        //
        // const storedCurrentSlide = localStorage.getItem('currentSlide');
        // if (storedCurrentSlide) {
        //     setCurrentSlide(reconstructSlide(JSON.parse(storedCurrentSlide)));
        // }
        //
        // if (mediatorRef && storedSlides && storedCurrentSlide) {
        //     mediatorRef.current = buildUpSlidesList({
        //         slides: JSON.parse(storedSlides).map((slide) => reconstructSlide(slide)),
        //         currentSlide: reconstructSlide(JSON.parse(storedCurrentSlide)),
        //         setSlides,
        //         setCurrentSlide,
        //     })
        // }
    }, []);

    if (!mediatorRef.current) {
        mediatorRef.current = new SlidesList();
        mediatorRef.current.registerSlideList(setSlides);
        mediatorRef.current.registerCurrentSlide(setCurrentSlide);
        mediatorRef.current.setSlides(slides);
        mediatorRef.current.setCurrentSlide(currentSlide);
    }

    useEffect(() => {
        if (dbRef.current) {
            saveToDB(dbRef.current, 'slides', slides).catch((error) =>
                console.error('Failed to save slides to IndexedDB', error)
            );
        }
    }, [slides]);

    useEffect(() => {
        console.log('useEffect', currentSlide);
        if (dbRef.current) {
            clearDB(dbRef.current, 'currentSlide');
            if (currentSlide) {
                saveToDB(dbRef.current, 'currentSlide', currentSlide).catch((error) =>
                    console.error('Failed to save currentSlide to IndexedDB', error)
                );
            }
        }
    }, [currentSlide]);

    // useEffect(() => {
    //     localStorage.setItem('slides', JSON.stringify(slides));
    // }, [slides]);

    // useEffect(() => {
    //     if (currentSlide) {
    //         localStorage.setItem('currentSlide', JSON.stringify(currentSlide));
    //     } else {
    //         localStorage.removeItem('currentSlide');
    //     }
    // }, [currentSlide]);

    return (
        <SlideMediatorContext.Provider value={{ mediator: mediatorRef.current, slides, currentSlide }}>
            {children}
        </SlideMediatorContext.Provider>
    );
};

