import * as s from "./styled.module.scss";
import { memo, FC } from "react";
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { Slide } from '@/components/slide';


const SlideArea: FC = () => {
  const { currentSlide } = useSlideMediator();

    if (!currentSlide) {
        return null;
    }

    return (
        <div className={s.root}>
          {currentSlide.id}
            {/* <Slide
                type="big"
                id={currentSlide.id}
            /> */}
        </div>
    )
}

export default memo(SlideArea);
