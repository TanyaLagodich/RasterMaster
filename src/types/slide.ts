import { CSSProperties } from 'react';

type Position = {
    x: number;
    y: number;
};

export type Dimensions = {
    width: number;
    height: number;
};

type BaseNode = {
    id: string;
    type: NodeType;
    positionPercent: Position;
    dimensionsPercent: Dimensions;
    zIndex: number;
    style?: CSSProperties;
};

export enum NodeType {
    TEXT = 'text',
    IMAGE = 'image',
}

export type ZIndex = {
    max: number;
    min: number;
};

type ImageStyle = {
    borderRadius: string;
    cover: boolean;
};

export type Text = {
    type: NodeType.TEXT;
    value: string;
} & BaseNode;

export type Image = {
    type: NodeType.IMAGE;
    src: string;
    style: ImageStyle;
} & BaseNode;

export type Node = Text | Image;

export interface Slide {
  id: string;
  preview: string;
  nodes: Node[] | [];
  editorDimensions: Dimensions;
  zIndex: ZIndex;
  addNode: (type: NodeType) => Promise<Node>;
  updateNode: (node: Node) => void;
  update: (newData: Partial<Slide>) => void;
  clone: () => Slide;
}

export enum SlideTypes {
    DEFAULT = 'default',
    EMPTY = 'empty',
    TEXT_LEFT_TEXT_RIGHT = 'TextLeftTextRight',
    TEXT_X4 = 'TextX4',
}

export type Template =
    SlideTypes.DEFAULT |
    SlideTypes.EMPTY |
    SlideTypes.TEXT_LEFT_TEXT_RIGHT |
    SlideTypes.TEXT_X4;
    // 'Image',
    // 'TextLeftImageRight',
    // 'ImageLeftTextRight',
    // 'ImageLeftImageRight',
    // 'ImageX4'