import type { Command } from '@/types';
import { SlideTypes } from '@/types';
import { SlidesContextType } from '@/context/slidesContext';
import { SlideFactory } from '@/factories';

export class AddSlideCommand implements Command {
  constructor(private slidesContext: SlidesContextType) {}
  
  execute(type: SlideTypes = SlideTypes.EMPTY) {
    const newSlide = SlideFactory.createSlide(type);
    this.slidesContext.addSlide(newSlide);
  }
}