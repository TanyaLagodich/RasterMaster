import { SlidesList } from '@/mediator';
import type { Slide } from '@/types';

export type SlideMediatorContextType = {
    mediator: SlidesList;
    slides: Slide[];
    currentSlide: Slide | null;
};
