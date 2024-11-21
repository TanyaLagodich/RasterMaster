import { nanoid } from 'nanoid';
import { NodeStrategyFactory } from '@/factories/node-strategy';
import { SlideStrategyFactory } from '@/strategy';
import {
    Slide as SlideType,
    Template,
    NodeType,
    Dimensions,
    ZIndex,
    Node,
} from '@/types';

class Slide implements SlideType {
    id: string;
    preview: string;
    nodes: Node[];
    editorDimensions: Dimensions;
    zIndex: ZIndex;

    constructor(type: Template = Template.DEFAULT) {
        this.id = nanoid();
        this.preview = '';
        this.editorDimensions = { width: 0, height: 0 };
        this.zIndex = { max: 0, min: 0 };

        const strategy = SlideStrategyFactory.createStrategy(type);
        this.nodes = strategy.generateNodes();
    }

    async addNode(type: NodeType, params?: Partial<Node>): Promise<Node> {
        const strategy = await NodeStrategyFactory.createStrategy(type);
        // console.log(type, params);
        const node = await strategy.addNode(params);
        this.nodes.push(node);
        return node;
    }

    updateNode(node: Node) {
        this.nodes = this.nodes.map((prevNode) =>
            prevNode.id === node.id ? node : prevNode
        );
    }

    removeNode(nodeId: string) {
        this.nodes = this.nodes.filter((node) => node.id !== nodeId);
    }

    update(newData: Partial<Slide>) {
        Object.assign(this, newData);
    }

    clone(): Slide {
        const clonedSlide = new Slide();
        clonedSlide.id = nanoid();
        clonedSlide.preview = this.preview;
        clonedSlide.nodes = this.nodes.map((node) => ({ ...node }));
        clonedSlide.editorDimensions = { ...this.editorDimensions };
        clonedSlide.zIndex = { ...this.zIndex };
        return clonedSlide;
    }
}

export class SlideFactory {
    static createSlide(type: Template = Template.DEFAULT): Slide {
        return new Slide(type);
    }
}