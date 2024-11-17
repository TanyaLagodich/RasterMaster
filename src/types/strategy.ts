import { Node } from './slide';

export interface NodeStrategy {
    addNode(params?: Partial<Node>): Promise<Node> | Node;
    updateNode(node: Node, newData: Partial<Node>): Node;
}

export interface SlideStrategy {
    generateNodes(): Node[];
}
