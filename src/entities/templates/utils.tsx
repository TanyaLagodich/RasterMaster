import { Node } from '@/types';
import { Text } from '@/components/text';
import { DragEvent } from 'react';
import { NodeType, Template } from '@/types';

export const templatesDict: Record<Template, string> = {
    [Template.DEFAULT]: 'Стандартный слайд',
    [Template.EMPTY]: 'Пустой слайд',
    [Template.TEXT_LEFT_TEXT_RIGHT]: '2 колонки текста',
    [Template.TEXT_X4]: '4 секции текста',
    [Template.TEXT_LEFT_IMAGE_RIGHT]: 'Текст + Картинка',
    [Template.IMAGE_LEFT_TEXT_RIGHT]: 'Картинка + Текст',
    [Template.IMAGE_LEFT_IMAGE_RIGHT]: '2 картинки',
    [Template.IMAGE_X4]: '4 картинки',
    [Template.TEXT_LEFT_FRAME_RIGHT]: 'Текст + Фрейм',
    [Template.IMAGE_LEFT_FRAME_RIGHT]: 'Картинка + Фрейм',
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