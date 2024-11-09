import { ISlideNew } from '@/entities/slides/types';
import * as s from './slide-preview.module.scss';

export function SlidePreview ({
    slide,
    isActive,
}: {slide: ISlideNew; isActive: boolean}) {
  return (
      <div className={`${s.root} ${isActive ? s.active : ''}`}>
        {slide.preview && <img
            width={200}
            height={100}
            src={slide.preview}
        />}
      </div>
  );
}
