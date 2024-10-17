import { ISlide } from "@/entities/slides/types";
import * as s from "./styled.module.scss";
import { memo, FC } from "react";

interface IProps {
    slide: ISlide | null;
}

const SlideArea: FC<IProps> = ({slide}) => {
    const {Component: Slide} = slide ?? {};

    if (!slide) {
        return null;
    }

    return (
        <div className={s.root}>
            {!!slide && 
                <Slide
                    type="big"
                    id={slide.id}
                />
            }
        </div>
    )
}

export default memo(SlideArea);