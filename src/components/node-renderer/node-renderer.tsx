import React from "react";
import { Node as SlideNode, NodeType } from "@/types";
import { Text } from "@/components/text";
import { Image } from "@/components/image";
import { IFrame } from "@/components/iframe";

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
    switch (node.type) {
        case NodeType.TEXT:
            return (
                <Text
                    key={node.id}
                    data={node}
                    onDragStart={onDragStart}
                    onDragEnd={(e) => onDragEnd?.(e, node)}
                />
            );
        case NodeType.IMAGE:
            return (
                <Image
                    key={node.id}
                    data={node}
                    onDragStart={onDragStart}
                    onDragEnd={(e) => onDragEnd?.(e, node)}
                />
            );
        case NodeType.IFRAME:
            return (
                <IFrame
                    key={node.id}
                    data={node}
                    onDragStart={onDragStart}
                    onDragEnd={(e) => onDragEnd?.(e, node)}
                />
            );
        default:
            return null;
    }
}
