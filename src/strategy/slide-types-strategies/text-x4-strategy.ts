import { nanoid } from 'nanoid';
import { SlideStrategy, Node, NodeType } from '@/types';

export class TextX4SlideStrategy implements SlideStrategy {
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
        type: NodeType.TEXT,
        positionPercent: { x: 5, y: 25 },
        dimensionsPercent: { height: 30, width: 40 },
        zIndex: 1,
        value: 'Ваш текст',
      },
      {
        id: nanoid(),
        type: NodeType.TEXT,
        positionPercent: { x: 55, y: 25 },
        dimensionsPercent: { height: 30, width: 40 },
        zIndex: 1,
        value: 'Ваш текст',
      },
      {
        id: nanoid(),
        type: NodeType.TEXT,
        positionPercent: { x: 5, y: 65 },
        dimensionsPercent: { height: 30, width: 40 },
        zIndex: 1,
        value: 'Ваш текст',
      },
      {
        id: nanoid(),
        type: NodeType.TEXT,
        positionPercent: { x: 55, y: 65 },
        dimensionsPercent: { height: 30, width: 40 },
        zIndex: 1,
        value: 'Ваш текст',
      },
    ];
  }
}
