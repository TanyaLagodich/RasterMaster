import { Header } from "@/components/header";
import ToolsHeader from "@/components/tools-header";
import Sidebar from "@/components/sidebar";
import SlideArea from "@/components/slide-area";
import Notes from "@/components/notes";
import {Slide} from "@/components/slide/slide";

import * as s from "./styled.module.scss";
import { FC, useCallback, useState } from "react";
import { ICreateSlideOptions, ISlide } from "@/entities/slides/types";
import { v4 as uuidv4 } from 'uuid';

const initialSlide: ISlide = {
    Component: Slide,
    id: uuidv4(),
}

export function Layout() {
    const [slides, setSlides] = useState<ISlide[]>([initialSlide]);
    const [currentSlide, setCurrentSlide] = useState<ISlide | null>(initialSlide);
    
    const addSlide = useCallback((
        id?: string,
        options?: ICreateSlideOptions,
    ) => {
        const {duplicate} = options ?? {};

        const newSlide: ISlide = {
            Component: duplicate ? currentSlide.Component : Slide,
            id: uuidv4(),
        }

        let prevSlideIndex: number;

        if (!id) {
            prevSlideIndex = slides.length;
        } else {
            // TODO: Попробовать оптимизировать до константной сложности
            slides.forEach((slide, index) => {
                if (slide.id === id) {
                    prevSlideIndex = index;
                    return;
                }
            });
        }
        
        setSlides(prevSlides => [...prevSlides.slice(0, prevSlideIndex + 1), newSlide, ...prevSlides.slice(prevSlideIndex + 1)]);
        setCurrentSlide(newSlide);
    }, [slides])

    const createSlide = useCallback((id: string) => {
        addSlide(id);
    }, [addSlide])

    const pushSlide = useCallback(() => {
        addSlide();
    }, [addSlide])

    const duplicateSlide = useCallback((id: string) => {
        addSlide(id, {duplicate: true});
    }, [addSlide])

    const getNewCurrentSlide = useCallback((id: string) => {
        if (currentSlide.id !== id) {
            return;
        }

        let result: ISlide | null;

        slides.forEach((slide, index, arr) => {
            if (arr.length === 1) {
                result = null
            }

            if (index === arr.length - 1) {
                result = slides[index - 1];
            }
            
            if (slide.id === id) {
                result = slides[index + 1];
            }
        })
        
        setCurrentSlide(result);
    }, [slides, currentSlide, setCurrentSlide]);
 
    const removeSlide = useCallback((id: string) => {
        getNewCurrentSlide(id);
        setSlides(prevSides => prevSides.filter(slide => slide.id !== id));
    }, [slides, currentSlide, getNewCurrentSlide])

    const changeSlide = useCallback((slide: ISlide) => {
        setCurrentSlide(slide);
    }, [])

    const editSlide = useCallback((id: string) => {
       
    }, [])

    // Handlers for grag'n'drop
    const touchSlide = useCallback(() => {}, [])
    const moveSlide = useCallback(() => {}, [])
    const untouchSlide = useCallback(() => {}, [])

    return (
        <>
            <Header />

            <ToolsHeader />

            <div className={s.body}>
                <Sidebar 
                    slides={slides}
                    changeSlide={changeSlide}
                    pushSlide={pushSlide}
                    createSlide={createSlide}
                    removeSlide={removeSlide}
                    duplicateSlide={duplicateSlide}
                />

                <div className={s.content}>
                    <SlideArea slide={currentSlide}/>

                    <Notes />
                </div>
            </div>
        </>
    );
}
