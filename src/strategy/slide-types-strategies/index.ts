import { DefaultSlideStrategy } from './default-slide-strategy';
import { TextLeftTextRightSlideStrategy } from './text-left-text-right-strategy';
import { TextX4SlideStrategy } from './text-x4-strategy';
import { Template, SlideStrategy } from '@/types';

export class SlideStrategyFactory {
  static createStrategy(type: Template): SlideStrategy {
    switch (type) {
      case Template.DEFAULT:
        return new DefaultSlideStrategy();

      case Template.TEXT_LEFT_TEXT_RIGHT:
        return new TextLeftTextRightSlideStrategy();

      case Template.TEXT_X4:
        return new TextX4SlideStrategy();

      case Template.EMPTY:
      default:
        return { generateNodes: () => [] }; 
    }
  }
}