import { Node } from './slide';

export interface NodeStrategy {
  addNode(): Promise<Node> | Node;
  updateNode(node: Node, newData: any): Node;
}
