type Position = {
    x: number;
    y: number;
};

type BaseNode = {
    id: string;
    positionPercent: Position;
    dimensionsPercent: Dimensions;
    zIndex: number;
};

export enum NodeType {
    TEXT = 'text',
    IMAGE = 'image',
}

export type ZIndex = {
    max: number;
    min: number;
};

export type Dimensions = {
    width: number;
    height: number;
};

export type Text = {
    type: NodeType.TEXT;
    value: string;
} & BaseNode;

export type Image = {
    type: NodeType.IMAGE;
    src: string;
} & BaseNode;

export type Node = Text | Image;

export interface Slide {
  id: string;
  preview: string,
  nodes: Node[],
  editorDimensions: Dimensions,
  zIndex: ZIndex,
}

export enum SlideTypes {
  EMPTY = 'empty',
};
