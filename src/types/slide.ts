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
  preview: string,
  nodes: Node[] | [],
  editorDimensions: Dimensions,
  zIndex: ZIndex,
  addNode: (type: NodeType) => Promise<Node>;
  updateNode: (node: Node) => void;
  update: (newData: Partial<Slide>) => void;
  clone: () => Slide;
}

export enum SlideTypes {
    EMPTY = "empty",
}
