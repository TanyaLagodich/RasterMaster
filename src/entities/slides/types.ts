import { FC, MouseEvent } from 'react';
import { Template } from '../templates/types';
import { Node } from '@/types';

export type SlideOperation = (event: MouseEvent, id: string, Template: Template) => void;

export interface ISlideProps {
    id: string;
    view: 'big' | 'small';
    nodes?: Node[];
    index?: number;
    createSlide?: (event: MouseEvent, id: string, template: Template) => void;
    removeSlide?: (event: MouseEvent, id: string) => void;
    duplicateSlide?:(event: MouseEvent, id: string) => void;
    changeSlide?: (slide: ISlideNew) => void;
    template?: Template; // To remove
}

export interface ISlide {
    Component?: FC<ISlideProps>;
    content: Node[];
    id: string;
}

export interface ICreateSlideOptions {
    duplicate: boolean;
}

export interface IOptionSlideOperations {
    key: string;
    label: string;
    method?: (...args: any[]) => void;
    close?: boolean;
}

export interface ISlideNew {
    id: string;
    preview: string;
    nodes: any[],
}

