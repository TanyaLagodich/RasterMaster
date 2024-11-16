import { DefaultSlideStrategy } from './default-slide-strategy';
import { TextLeftTextRightSlideStrategy } from './text-left-text-right-strategy';
import { TextX4SlideStrategy } from './text-x4-strategy';
import { SlideTypes, SlideStrategy } from '@/types';

export class SlideStrategyFactory {
  static createStrategy(type: SlideTypes): SlideStrategy {
    switch (type) {
      case SlideTypes.DEFAULT:
        return new DefaultSlideStrategy();

      case SlideTypes.TEXT_LEFT_TEXT_RIGHT:
        return new TextLeftTextRightSlideStrategy();

      case SlideTypes.TEXT_X4:
        return new TextX4SlideStrategy();

      case SlideTypes.EMPTY:
      default:
        return { generateNodes: () => [] }; 
    }
  }
}