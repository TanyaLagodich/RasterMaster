import { FC, MouseEvent, RefObject } from "react";
import { SlideContextType } from "@/context/slideContext";

export type SlideOperation = (event: MouseEvent, id: string) => void;

export interface ISlideProps {
    type: 'big' | 'small';
    id: string;
    index?: number;
    createSlide?: SlideOperation;
    removeSlide?: SlideOperation;
    duplicateSlide?: SlideOperation;
    changeSlide?: (slide: ISlideNew) => void;
}

export interface ISlide {
    Component: FC<ISlideProps>;
    id: string;
}

export interface ICreateSlideOptions {
    duplicate: boolean;
}

export interface IOptionSlideOperations {
    key: string;
    label: string;
    method?: SlideOperation;
}

export interface ISlideNew {
    id: string;
    preview: string;
    nodes: any[],
}

