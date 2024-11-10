import { Command, Slide, Node } from '@/types';
import { SlideFactory } from '@/factories';
import { SlidesContextType  } from '@/context/slidesContext';

export class DuplicateSlideCommand implements Command {
  constructor(private slidesContext: SlidesContextType, private slide: Slide) {} 
  
  execute() {
    if (!this.slide) return;
 
    const duplicatedSlide: Slide = {
      ...SlideFactory.createSlide(),
      nodes: this.slide.nodes.map((node: Node) => ({ ...node })),
      editorDimensions: { ...this.slide.editorDimensions },
      zIndex: { ...this.slide.zIndex },
      preview: this.slide.preview,
    };
 
    this.slidesContext.addSlide(duplicatedSlide);
  }
}
