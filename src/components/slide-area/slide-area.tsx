import { ISlideNew } from "@/entities/slides/types";
import * as s from "./styled.module.scss";
import { memo, FC } from "react";
import { Slide } from '@/components/slide';

interface IProps {
    slide: ISlideNew | null;
}

const SlideArea: FC<IProps> = ({slide}) => {

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
