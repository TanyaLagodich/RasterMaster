import React, { CSSProperties } from 'react';
import { Node as SlideNode, NodeType } from '@/types';
import { BaseNode } from '@/components/base-node';
import { Text } from '@/components/text';
import { Image } from '@/components/image';
import { IFrame } from '@/components/iframe';
import { DraggableNode } from '@/components/draggable-node';
import { computeNodeStyle } from '@/utils/computedNodeStyles';

interface NodeRendererProps {
    node: SlideNode;
    isEditable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (e: React.DragEvent<HTMLDivElement>, node: SlideNode) => void;
}

export function NodeRenderer({
     node,
     isEditable = false,
     onDragStart,
     onDragEnd,
 }: NodeRendererProps): React.ReactElement | null {

    const renderNode = () => {
        switch (node.type) {
            case NodeType.TEXT:
                return (
                    <Text
                        key={node.id}
                        data={node}
                        isEditable={isEditable}
                    />
                );
            case NodeType.IMAGE:
                return (
                    <Image
                        key={node.id}
                        data={node}
                        isEditable={isEditable}
                    />
                );
            case NodeType.IFRAME:
                return (
                    <IFrame
                        key={node.id}
                        data={node}
                    />
                );
            default:
                return null;
        }
    }

    return isEditable ? (
        <DraggableNode
            data={node}
            onDragStart={onDragStart}
            onDragEnd={(e) => onDragEnd?.(e, node)}
        >
            {renderNode()}
        </DraggableNode>) :
        <div style={computeNodeStyle(node, false, node.zIndex)}>
            {renderNode()}
        </div>
}
