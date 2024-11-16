import { nanoid } from 'nanoid';
import { SlideStrategy, Node, NodeType } from '@/types';

export class DefaultSlideStrategy implements SlideStrategy {
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
        dimensionsPercent: { height: 70, width: 90 },
        zIndex: 1,
        value: 'Напишите что-нибудь',
      },
    ];
  }
}