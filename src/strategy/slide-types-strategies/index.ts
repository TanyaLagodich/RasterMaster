import { DefaultSlideStrategy } from './default-slide-strategy';
import { ImageLeftImageRightSlideStrategy } from './image-left-image-right';
import { ImageLeftTextRightSlideStrategy } from './image-left-text-right';
import { TextLeftImageRightSlideStrategy } from './text-left-image-right';
import { TextLeftTextRightSlideStrategy } from './text-left-text-right-strategy';
import { TextX4SlideStrategy } from './text-x4-strategy';
import { Template, SlideStrategy } from '@/types';

export class SlideStrategyFactory {
  static createStrategy(type: Template): SlideStrategy {
    switch (type) {
      case Template.DEFAULT:
        return new DefaultSlideStrategy();

      case Template.EMPTY:
        return { generateNodes: () => [] };

      case Template.TEXT_LEFT_TEXT_RIGHT:
        return new TextLeftTextRightSlideStrategy();

      case Template.TEXT_X4:
        return new TextX4SlideStrategy();

      case Template.TEXT_LEFT_IMAGE_RIGHT:
        return new TextLeftImageRightSlideStrategy();

      case Template.IMAGE_LEFT_TEXT_RIGHT:
        return new ImageLeftTextRightSlideStrategy();

      case Template.IMAGE_LEFT_IMAGE_RIGHT:
        return new ImageLeftImageRightSlideStrategy();

      default:
        return new DefaultSlideStrategy();
    }
  }
}