import type { Command } from '@/types';
import { Slide } from '@/types';
import { SlidesContextType } from '@/context/slidesContext';

export class RemoveSlideCommand implements Command {
  private removedSlide: Slide | null = null;
  
  constructor(private slidesContext: SlidesContextType, private slideId: string) {}
  
  execute() {
    this.removedSlide = this.slidesContext.removeSlide(this.slideId);
  }
}