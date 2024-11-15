import { nanoid } from 'nanoid';
import { NodeStrategyFactory } from '@/factories/node-strategy';
import { Slide as SlideType, SlideTypes, NodeType, Dimensions, ZIndex, Node } from '@/types';

class Slide implements SlideType {
    id: string;
    preview: string;
    nodes: Node[];
    editorDimensions: Dimensions;
    zIndex: ZIndex;

    // TODO добавить логику обработки разных типов слайдов
    constructor(type: SlideTypes = SlideTypes.EMPTY) {
        this.id = nanoid();
        this.preview = '';
        this.nodes = [];
        this.editorDimensions = { width: 0, height: 0 };
        this.zIndex = { max: 0, min: 0 };
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
