import { SlideMediator } from '@/mediator';
import type { Slide } from '@/types';

export type SlideMediatorContextType = {
    mediator: SlideMediator;
    slides: Slide[];
    currentSlide: Slide | null;
};
