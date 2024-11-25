import { CSSProperties, MouseEvent } from 'react';

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
    IFRAME = 'iframe',
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
    imgStyle: ImageStyle;
} & BaseNode;

export type IFrame = {
    type: NodeType.IFRAME;
    src: string;
} & BaseNode;

export type Node = Text | Image | IFrame;

export interface Slide {
    id: string;
    preview: string;
    nodes: Node[];
    editorDimensions: Dimensions;
    zIndex: ZIndex;
    backgroundColor: string;
    backgroundImage?: string;
    addNode: (type: NodeType, params?: Partial<Node>) => Promise<Node>;
    updateNode: (node: Node) => void;
    update: (newData: Partial<Slide>) => void;
    deleteNode: (id: string) => void;
    copyNode: (id: string) => void;
    clone: () => Slide;
}

export enum Template {
    DEFAULT = 'default',
    EMPTY = 'empty',
    TEXT_LEFT_TEXT_RIGHT = 'textLeftTextRight',
    TEXT_LEFT_IMAGE_RIGHT = 'textLeftImageRight',
    IMAGE_LEFT_TEXT_RIGHT = 'imageLeftTextRight',
    IMAGE_LEFT_IMAGE_RIGHT = 'imageLeftImageRight',
    TEXT_X4 = 'textX4',
}

export interface ISetting {
    key: string;
    label: string;
    onClick: (...args: any[]) => void;
}
