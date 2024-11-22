import { nanoid } from 'nanoid';
import { SlideStrategy, Node, NodeType } from '@/types';

export class ImageLeftTextRightSlideStrategy implements SlideStrategy {
  generateNodes(): Node[] {
    return [
      {
        id: nanoid(),
        type: NodeType.TEXT,
        positionPercent: { x: 5, y: 5 },
        dimensionsPercent: { height: 15, width: 90 },
        zIndex: 2,
        value: 'Заголовок слайда',
        style: { textAlign: 'center', fontSize: 32, marginTop: 16 },
      },
      {
        id: nanoid(),
        type: NodeType.IMAGE,
        positionPercent: { x: 5, y: 25 },
        dimensionsPercent: { height: 25, width: 30 },
        zIndex: 1,
        src: 'https://i.pinimg.com/originals/ba/bd/6d/babd6d37eb2dd965c7f1dfb516d54094.jpg',
        imgStyle: {
            borderRadius: '0px',
            cover: false,
        },
      },
      {
        id: nanoid(),
        type: NodeType.TEXT,
        positionPercent: { x: 55, y: 25 },
        dimensionsPercent: { height: 70, width: 40 },
        zIndex: 1,
        value: 'Ваш текст',
      },
    ];
  }
}