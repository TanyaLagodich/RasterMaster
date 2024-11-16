import { nanoid } from 'nanoid';
import { NodeStrategyFactory } from '@/factories/node-strategy';
import { Slide as SlideType, SlideTypes, NodeType, Dimensions, ZIndex, Node } from '@/types';

class Slide implements SlideType {
    id: string;
    preview: string;
    nodes: Node[];
    editorDimensions: Dimensions;
    zIndex: ZIndex;

    constructor(type: SlideTypes = SlideTypes.EMPTY) {
      this.id = nanoid();
      this.preview = '';
      this.editorDimensions = { width: 0, height: 0 };
      this.zIndex = { max: 0, min: 0 };

      switch (type) {
        case SlideTypes.DEFAULT:
          this.nodes = [
            {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 5},
              dimensionsPercent: {height: 15, width: 90},
              zIndex: 2,
              value: 'Заголовок слайда',
              style: {textAlign: 'center', fontSize: 32, marginTop: 16},
            },
            {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 25},
              dimensionsPercent: {height: 70, width: 90},
              zIndex: 1,
              value: 'Напишите что-нибудь',
            },
          ];
          break;

        case SlideTypes.TEXT_LEFT_TEXT_RIGHT:
          this.nodes = [
            {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 5},
              dimensionsPercent: {height: 15, width: 90},
              zIndex: 2,
              value: 'Заголовок слайда',
              style: {textAlign: 'center', fontSize: 32, marginTop: 16},
            },
            {
                id: nanoid(),
                type: NodeType.TEXT,
                positionPercent: {x: 5, y: 25},
                dimensionsPercent: {height: 70, width: 40},
                zIndex: 1,
                value: 'Ваш текст',                      
            },
            {
                id: nanoid(),
                type: NodeType.TEXT,
                positionPercent: {x: 55, y: 25},
                dimensionsPercent: {height: 70, width: 40},
                zIndex: 1,
                value: 'Ваш текст',                      
            },
          ];
          break;

        case SlideTypes.TEXT_X4:
          this.nodes = [
            {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 5},
              dimensionsPercent: {height: 15, width: 90},
              zIndex: 2,
              value: 'Заголовок слайда',
              style: {textAlign: 'center', fontSize: 32, marginTop: 16},
          },
          {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 25},
              dimensionsPercent: {height: 30, width: 40},
              zIndex: 1,
              value: 'Ваш текст',                      
          },
          {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 55, y: 25},
              dimensionsPercent: {height: 30, width: 40},
              zIndex: 1,
              value: 'Ваш текст',                      
          },
          {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 5, y: 65},
              dimensionsPercent: {height: 30, width: 40},
              zIndex: 1,
              value: 'Ваш текст',                      
          },
          {
              id: nanoid(),
              type: NodeType.TEXT,
              positionPercent: {x: 55, y: 65},
              dimensionsPercent: {height: 30, width: 40},
              zIndex: 1,
              value: 'Ваш текст',
          },
          ];
          break;

        case SlideTypes.EMPTY:
        default:
          this.nodes = [];
        }
    }

    async addNode(type: NodeType): Promise<Node> {
      const strategy = await NodeStrategyFactory.createStrategy(type);
      const node = await strategy.addNode();
      this.nodes.push(node);
      return node;
    }

    updateNode(node: Node) {
      this.nodes = this.nodes.map((prevNode) => prevNode.id === node.id ? node : prevNode);
    }

    removeNode(nodeId: string) {
        this.nodes = this.nodes.filter(node => node.id !== nodeId);
    }

    update(newData: Partial<Slide>) {
      Object.assign(this, newData);
    }

    clone(): Slide {
      const clonedSlide = new Slide();
      clonedSlide.id = nanoid();
      clonedSlide.preview = this.preview;
      clonedSlide.nodes = this.nodes.map(node => ({ ...node }));
      clonedSlide.editorDimensions = { ...this.editorDimensions };
      clonedSlide.zIndex = { ...this.zIndex };
      return clonedSlide;
    }
}

export class SlideFactory {
  static createSlide(type: SlideTypes = SlideTypes.EMPTY): Slide {
    return new Slide(type);
  }
}
