import { memo, FC } from "react";
import * as s from "./styled.module.scss";
import { Typography } from 'antd';
import { Slide } from '@/types';
import { SlidePreview } from '@/components/slide/slide-preview';

interface IProps {
    currentSlide: Slide;
    slides: Slide[];
    changeSlide: (slide: Slide) => void;
    pushSlide: () => void;
    createSlide: () => void;
    removeSlide: (id: string) => void;
    duplicateSlide: (slide: Slide) => void;
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
                        <SlidePreview
                            isActive={currentSlide.id === slide.id}
                            slide={slide}
                            onCreateSlide={createSlide}
                            onRemoveSlide={removeSlide}
                            onDuplicateSlide={duplicateSlide}
                        />
                    </div>
                )
            })}

            <Typography className={s.text} onClick={pushSlide}>Новый слайд</Typography>
        </aside>
    );
}

export default memo(Sidebar);
