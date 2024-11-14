import { nanoid } from 'nanoid';
import { NodeStrategy, NodeType, Text } from '@/types';

export class TextNodeStrategy implements NodeStrategy {
  addNode(): Text {
    return {
      id: nanoid(),
      type: NodeType.TEXT,
      positionPercent: { x: 10, y: 10 },
      dimensionsPercent: { width: 30, height: 20 },
      zIndex: 1,
      value: 'Test',
    };
  }
  
  updateNode(node: Text, newData: Text): Text {
    return { ...node, ...newData }
  }
}