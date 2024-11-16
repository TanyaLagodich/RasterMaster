import { Template } from "../templates/types"
import { v4 as uuidv4 } from 'uuid';
import { Node, NodeType } from '@/types';

export class SlideFactory {
    static createSlide(type: Template = 'Default'): Node[] {
        switch (type) {
            case 'Default':
                return [
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 5},
                        dimensionsPercent: {height: 15, width: 90},
                        zIndex: 2,
                        value: 'Заголовок слайда',
                        style: {textAlign: 'center', fontSize: 32, marginTop: 16},
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 25},
                        dimensionsPercent: {height: 70, width: 90},
                        zIndex: 1,
                        value: 'Напишите что-нибудь',
                    },
                ]

            case 'Empty':
                return [];

            case 'TextLeftTextRight':
                return [
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 5},
                        dimensionsPercent: {height: 15, width: 90},
                        zIndex: 2,
                        value: 'Заголовок слайда',
                        style: {textAlign: 'center', fontSize: 32, marginTop: 16},
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 25},
                        dimensionsPercent: {height: 70, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',                      
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 55, y: 25},
                        dimensionsPercent: {height: 70, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',                      
                    },
                ]

            case 'TextX4':
                return [
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 5},
                        dimensionsPercent: {height: 15, width: 90},
                        zIndex: 2,
                        value: 'Заголовок слайда',
                        style: {textAlign: 'center', fontSize: 32, marginTop: 16},
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 25},
                        dimensionsPercent: {height: 30, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',                      
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 55, y: 25},
                        dimensionsPercent: {height: 30, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',                      
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 5, y: 65},
                        dimensionsPercent: {height: 30, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',                      
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 55, y: 65},
                        dimensionsPercent: {height: 30, width: 40},
                        zIndex: 1,
                        value: 'Ваш текст',
                    },
                ]

            default:
                return [
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 0, y: 0},
                        dimensionsPercent: {height: 20, width: 100},
                        zIndex: 1,
                        value: 'Заголовок слайда',
                        style: {textAlign: 'center', fontSize: 32},
                    },
                    {
                        id: uuidv4(),
                        type: NodeType.TEXT,
                        positionPercent: {x: 0, y: 20},
                        dimensionsPercent: {height: 80, width: 100},
                        zIndex: 1,
                        value: 'Напишите что-нибудь',
                    },
                ]
        }
    }
}
  