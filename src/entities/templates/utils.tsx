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
}
