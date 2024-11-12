import { Header } from "@/components/header";
import ToolsHeader from "@/components/header/tools-header";
import Sidebar from "@/components/sidebar";
import SlideArea from "@/components/slide-area";
import Notes from "@/components/notes";
import { Slide } from "@/components/slide/slide";
import { useCallback, useState, MouseEvent } from "react";
import { ICreateSlideOptions, ISlide } from "@/entities/slides/types";
import { v4 as uuidv4 } from 'uuid';
import { SlideFactory } from "../../entities/slides/utils";
import { Node, NodeType } from "../../context/slideContext";
import * as s from "./styled.module.scss";
import { Template } from "@/entities/templates/types";

const initialSlideContent = SlideFactory.createSlide();

const initialSlide: ISlide = {
    content: initialSlideContent,
    id: uuidv4(),
}

export function App() {
    const [slides, setSlides] = useState<ISlide[]>([initialSlide]);
    const [currentSlide, setCurrentSlide] = useState<ISlide | null>(initialSlide);

    const createSlide = useCallback((event: MouseEvent, id: string, template: Template = 'Default') => {
        event.stopPropagation();

        const newSlide: ISlide = {
            content: SlideFactory.createSlide(template),
            id: uuidv4(),
        }

        let prevSlideIndex: number;

        slides.forEach((slide, index) => {
            if (slide.id === id) {
                prevSlideIndex = index;
                return;
            }
        });
        setSlides(prevSlides => [...prevSlides.slice(0, prevSlideIndex + 1), newSlide, ...prevSlides.slice(prevSlideIndex + 1)]);
        setCurrentSlide(newSlide);
    }, [slides])

    const duplicateSlide = useCallback((event: MouseEvent, id: string) => {
        event.stopPropagation();

        let prevSlideIndex: number;

        slides.forEach((slide, index) => {
            if (slide.id === id) {
                prevSlideIndex = index;
                return;
            }
        });

        const prevSlide = slides[prevSlideIndex];
        const newSlide: ISlide = {
            content: [...prevSlide.content],
            id: uuidv4(),
        }
        setSlides(prevSlides => [...prevSlides.slice(0, prevSlideIndex + 1), newSlide, ...prevSlides.slice(prevSlideIndex + 1)]);
        setCurrentSlide(newSlide);
    }, [slides])

    const pushSlide = useCallback((template: Template = 'Default') => {
        const newSlide: ISlide = {
            content: SlideFactory.createSlide(template),
            id: uuidv4(),
        }
        setSlides(prevSlides => [...prevSlides, newSlide]);
        setCurrentSlide(newSlide);
    }, [])

    const setNewCurrentSlide = useCallback((id: string) => {
        if (currentSlide.id !== id) {
            return;
        }

        let result: ISlide | null;

        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            const arr = slides;

            if (arr.length === 1) {
                result = null;
                break;
            }

            if (i === arr.length - 1) {
                result = slides[i - 1];
                break;
            }

            if (slide.id === id) {
                result = slides[i + 1];
                break;
            }
        }

        setCurrentSlide(result);
    }, [slides, currentSlide]);

    const removeSlide = useCallback((event: MouseEvent, id: string) => {
        event.stopPropagation();
        setNewCurrentSlide(id);
        setSlides(prevSides => prevSides.filter(slide => slide.id !== id));
    }, [setNewCurrentSlide])

    const changeSlide = useCallback((slide: ISlide) => {
        setCurrentSlide(slide);
    }, [])

    const addText = useCallback((zIndex: number): Node => {
        return {
            id: uuidv4(),
            type: NodeType.TEXT,
            positionPercent: {x: 10, y: 10},
            dimensionsPercent: {width: 30, height: 20},
            zIndex: zIndex + 1,
            value: '',
        };
    }, []);

    const editSlide = useCallback((id: string) => {
        const slideToEdit = slides.find(slide => slide.id === id);

        if (!slideToEdit) return;

        const textNode = addText(slideToEdit.content[0].zIndex)
        slideToEdit.content.push(textNode);

        setSlides(prev => prev.map(slide => slide.id === id ? slideToEdit : slide))
    }, [slides, addText])

    // Handlers for grag'n'drop
    const touchSlide = useCallback(() => {}, [])
    const moveSlide = useCallback(() => {}, [])
    const untouchSlide = useCallback(() => {}, [])

    return (
        <>
            <Header />

            <ToolsHeader addText={addText} pushSlide={pushSlide}/>

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
