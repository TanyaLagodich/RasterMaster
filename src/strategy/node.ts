import { Node } from '@/types';

export interface NodeStrategy {
  addNode(): Node;
  updateNode(node: Node, newData: Node): Node;
}
