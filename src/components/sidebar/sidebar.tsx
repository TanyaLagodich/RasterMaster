import { memo, FC } from "react";
import * as s from "./styled.module.scss";
import { ICreateSlideOptions, ISlide, SlideOperation } from "@/types";
import {Typography} from 'antd'

interface IProps {
    slides: ISlide[];
    changeSlide: (slide: ISlide) => void;
    createSlide: SlideOperation;
    pushSlide: () => void;
    removeSlide: SlideOperation;
    duplicateSlide: SlideOperation;
}

const Sidebar: FC<IProps> = ({
    slides,
    changeSlide,
    createSlide,
    pushSlide,
    removeSlide,
    duplicateSlide,
}) => {
    return (
        <aside className={s.root}>
            {slides.map((slide, index) => {
                const {Component: Slide, id} = slide;

                return (
                    <div 
                        className={s.slideWrapper}
                        key={id}
                        onClick={() => changeSlide(slide)}
                    >
                        <Slide
                            type="small"
                            id={id}
                            createSlide={createSlide}
                            removeSlide={removeSlide}
                            duplicateSlide={duplicateSlide}
                            index={index}
                        />
                    </div>
                )
            })}

            <Typography className={s.text} onClick={pushSlide}>Новый слайд</Typography>
        </aside>
    );
}

export default memo(Sidebar);