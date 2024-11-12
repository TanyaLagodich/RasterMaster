import { nanoid } from 'nanoid';
import { Slide, SlideTypes } from '@/types';

export class SlideFactory {
  static createSlide(type: SlideTypes = SlideTypes.EMPTY): Slide {
    switch (type) {
      case SlideTypes.EMPTY:
      default:
        return {
          id: nanoid(),
          preview: '',
          nodes: [],
          editorDimensions: { width: 0, height: 0 },
          zIndex: { max: 0, min: 0 },
        } 
    }
  }
}
