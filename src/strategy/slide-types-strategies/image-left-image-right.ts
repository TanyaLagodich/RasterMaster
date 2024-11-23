import { nanoid } from 'nanoid';
import { SlideStrategy, Node, NodeType } from '@/types';
import { src } from '@/utils/defaultImage';

export class ImageLeftImageRightSlideStrategy implements SlideStrategy {
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
        src,
        imgStyle: {
            borderRadius: '0px',
            cover: false,
        },
      },
      {
        id: nanoid(),
        type: NodeType.IMAGE,
        positionPercent: { x: 55, y: 25 },
        dimensionsPercent: { height: 25, width: 30 },
        zIndex: 1,
        src,
        imgStyle: {
            borderRadius: '0px',
            cover: false,
        },
      },
    ];
  }
}