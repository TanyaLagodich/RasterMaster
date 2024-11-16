import { Node } from '@/types';
import { Template } from '@/types';
import { Text } from '@/components/text';
import { DragEvent } from 'react';
import { NodeType,SlideTypes } from '@/types';

export const templatesDict: Record<Template, string> = {
    [SlideTypes.DEFAULT]: 'Стандартный слайд',
    [SlideTypes.EMPTY]: 'Пустой слайд',
    [SlideTypes.TEXT_LEFT_TEXT_RIGHT]: '2 колонки текста',
    [SlideTypes.TEXT_X4]: '4 секции текста',
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