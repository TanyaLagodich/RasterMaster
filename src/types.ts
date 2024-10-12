import { FC } from "react";

export type SlideOperation = (id: string) => void;

export interface ISlideProps {
    type: 'big' | 'small';
    id: string;
    index?: number;
    createSlide?: SlideOperation;
    removeSlide?: SlideOperation;
    duplicateSlide?: SlideOperation;
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
    method?: (...args: any[]) => void;
}