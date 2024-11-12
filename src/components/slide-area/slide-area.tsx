import { ISlide } from "@/entities/slides/types";
import { memo, FC } from "react";
import { Slide } from "../slide/slide";
import * as s from "./styled.module.scss";

interface IProps {
    slide: ISlide | null;
}

const SlideArea: FC<IProps> = ({slide}) => {
    return (
        <div className={s.root}>
            {!!slide && 
                <Slide
                    view="big"
                    id={slide.id}
                    nodes={slide.content}
                    template="Default"
                />
            }
        </div>
    )
}

export default memo(SlideArea);