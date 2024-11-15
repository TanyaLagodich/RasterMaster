import { memo, FC } from "react";
import * as s from "./styled.module.scss";
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { Typography } from 'antd'
import { SlidePreview } from '@/components/slide-preview';


const Sidebar: FC = () => {
  const { mediator, slides, currentSlide } = useSlideMediator();
  
    return (
        <aside className={s.root}>
            {slides.map((slide) => {
                const { id } = slide;

                return (
                    <div
                        className={s.slideWrapper}
                        key={id}
                        onClick={() => mediator.selectSlide(id)}
                    >
                        {slide.id}
                        <SlidePreview
                            isActive={currentSlide.id === id}
                            slide={slide}
                        />
                    </div>
                )
            })}

            <Typography className={s.text} onClick={() => mediator.addSlide()}>Новый слайд</Typography>
        </aside>
    );
}

export default memo(Sidebar);
