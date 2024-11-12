import { Node, NodeType } from "@/context/slideContext";
import { Template } from "./types";
import { Text } from "@/components/text";
import { DragEvent } from "react";

export const templatesDict: Record<Template, string> = {
    'Default': 'Стандартный слайд',
    'Empty': 'Пустой слайд',
    'TextLeftTextRight': '2 колонки текста',
    'TextX4': '4 секции текста',
}

interface INodeFactoryArgs {
    node: Node;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    isEditable: boolean;
}

export class NodeFactory {
    static createNode({node, onDragStart, onDragEnd, isEditable}: INodeFactoryArgs): JSX.Element {
        switch(node.type) {
            case NodeType.TEXT:
                return (
                    <Text
                        key={node.id}
                        data={node}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                        isEditable={isEditable}
                    />
                )
            // case NodeType.IMAGE:
            //     return <Image/>;
        }
    }
}