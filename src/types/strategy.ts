import { Node } from './slide';

export interface NodeStrategy {
  addNode(): Node;
  updateNode(node: Node, newData: any): Node;
}
