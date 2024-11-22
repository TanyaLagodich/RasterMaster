import { nanoid } from 'nanoid';
import { NodeStrategy, NodeType, IFrame } from '@/types';

export class IFrameNodeStrategy implements NodeStrategy {
    addNode(params: IFrame): IFrame {
        return {
            id: nanoid(),
            type: NodeType.IFRAME,
            positionPercent: { x: 30, y: 30 },
            dimensionsPercent: { width: 20, height: 40 },
            zIndex: 1,
            src: params.src || '',
            isDraggable: true,
        };
    }

    updateNode(node: IFrame, newData: IFrame): IFrame {
        return { ...node, ...newData };
    }
}
