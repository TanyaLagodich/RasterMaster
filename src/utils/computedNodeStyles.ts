import { CSSProperties } from 'react';
import type { Node } from '@/types';

export const computeNodeStyle = (node: Node, isSelected: boolean, zIndex: number): CSSProperties => ({
    width: `${node.dimensionsPercent.width}%`,
    height: `${node.dimensionsPercent.height}%`,
    left: `${node.positionPercent.x}%`,
    top: `${node.positionPercent.y}%`,
    zIndex: isSelected ? zIndex + 1 : node.zIndex,
    position: 'absolute',
});
