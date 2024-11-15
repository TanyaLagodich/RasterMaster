import { TextNodeStrategy, ImageNodeStrategy } from '@/strategy';
import { type NodeStrategy, NodeType } from '@/types';

export class NodeStrategyFactory {
  static async createStrategy(type: NodeType): Promise<NodeStrategy> {
    switch (type) {
      case NodeType.TEXT:
        return new TextNodeStrategy();

      case NodeType.IMAGE:
        return new ImageNodeStrategy();

      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }
}
