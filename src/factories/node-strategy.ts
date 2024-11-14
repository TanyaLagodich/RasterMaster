import { TextNodeStrategy } from '@/strategy/text-node';
import { type NodeStrategy, NodeType } from '@/types';

export class NodeStrategyFactory {
  static createStrategy(type: NodeType): NodeStrategy {
    switch (type) {
      case NodeType.TEXT:
        return new TextNodeStrategy();
        
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  }
}
