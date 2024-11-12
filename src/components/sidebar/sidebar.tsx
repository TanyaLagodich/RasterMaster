import { memo, FC, MouseEvent } from "react";
import * as s from "./styled.module.scss";
import { ISlide } from "@/entities/slides/types";
import {Typography} from 'antd'
import { Template } from "@/entities/templates/types";
import { Slide } from "../slide";

interface IProps {
    slides: ISlide[];
    changeSlide: (slide: ISlide) => void;
    pushSlide: (template: Template) => void;
    createSlide: (event: MouseEvent, id: string, template: Template) => void;
    removeSlide: (event: MouseEvent, id: string) => void;
    duplicateSlide:(event: MouseEvent, id: string) => void;
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
                const {id, content: nodes} = slide;

                return (
                    <div 
                        className={s.slideWrapper}
                        key={id}
                        onClick={() => changeSlide(slide)}
                    >
                        <Slide
                            view="small"
                            id={id}
                            nodes={nodes}
                            template="Default"
                            createSlide={createSlide}
                            removeSlide={removeSlide}
                            duplicateSlide={duplicateSlide}
                            index={index}
                        />
                    </div>
                )
            })}

            <Typography className={s.text} onClick={() => pushSlide('Default')}>Новый слайд</Typography>
        </aside>
    );
}

export default memo(Sidebar);