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
        console.log(type, params);
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

export class SlidesListItem {
    value: Slide;
    next: SlidesListItem | null;
    prev: SlidesListItem | null;

    constructor(
        value: Slide,
        next: SlidesListItem | null = null, 
        prev: SlidesListItem | null = null, 
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

export class SlidesList {
    first: SlidesListItem | null;
    last: SlidesListItem | null;
    map: Map<string, SlidesListItem>;

    constructor() {
        this.first = null;
        this.last = null;
        this.map = new Map();
    }

    private findSlide(id: string) {
        return this.map.get(id) ?? null;
    }

    private insertSlide(id: string, slide: Slide) {
        const newSlideItem = new SlidesListItem(slide);
        this.map.set(slide.id, newSlideItem);

        if (this.isEmpty()) {
            this.last = newSlideItem;
            this.first = newSlideItem;
            return;
        }

        const currentSlideItem = this.map.get(id);

        const temp = currentSlideItem.next;
        currentSlideItem.next = newSlideItem;
        newSlideItem.prev = currentSlideItem;
        newSlideItem.next = temp;

        if (this.last.value.id === id) {
            this.last = newSlideItem;
        }
    }

    private isEmpty() {
        return this.map.size === 0;
    }

    public pushSlide(type: Template = Template.DEFAULT) {
        const newSlide = SlideFactory.createSlide(type);
        const newSlideItem = new SlidesListItem(newSlide);

        if (this.isEmpty()) {
            this.map.set(newSlide.id, newSlideItem);
            this.first = newSlideItem;
            this.last = newSlideItem;
            return;
        }

        this.last.next = newSlideItem;
        newSlideItem.prev = this.last;
        this.last = newSlideItem;
    }

    public createSlide(id: string, type: Template = Template.DEFAULT) {
        if (this.isEmpty()) {
            this.pushSlide(type);
            return;
        }

        const newSlide = SlideFactory.createSlide(type);
        this.insertSlide(id, newSlide);
    }

    public duplicateSlide(id: string, slide: Slide) {
        if (this.isEmpty()) {
            return;
        }

        const newSlide = slide.clone();
        this.insertSlide(id, newSlide);
    }

    public deleteSlide(id: string) {
        const slideToDelete = this.map.get(id);
        const prevSlide = slideToDelete.prev;
        const nextSlide = slideToDelete.next;
        prevSlide.next = nextSlide;
        nextSlide.prev = prevSlide;
        this.map.delete(id);
    }
}