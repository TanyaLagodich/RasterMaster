import { memo, FC } from "react";
import * as s from "./styled.module.scss";
import { ISlide, ISlideNew, SlideOperation } from "@/entities/slides/types";
import {Typography} from 'antd'
import { SlidePreview } from '@/components/slide/slide-preview';

interface IProps {
    currentSlide: ISlideNew;
    slides: ISlideNew[];
    changeSlide: (slide: ISlideNew) => void;
    pushSlide: () => void;
    createSlide: SlideOperation;
    removeSlide: SlideOperation;
    duplicateSlide: SlideOperation;
}

const Sidebar: FC<IProps> = ({
    currentSlide,
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
                const {preview, nodes, id} = slide;

                return (
                    <div
                        className={s.slideWrapper}
                        key={id}
                        onClick={() => changeSlide(slide)}
                    >
                        {slide.id}
                        <SlidePreview
                            isActive={currentSlide.id === slide.id}
                            slide={slide}
                        />
                    </div>
                )
            })}

            <Typography className={s.text} onClick={pushSlide}>Новый слайд</Typography>
        </aside>
    );
}

export default memo(Sidebar);
