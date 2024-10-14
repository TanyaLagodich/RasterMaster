import { createContext, ReactNode, useMemo, useState } from "react";
import { nanoid } from "nanoid";

export enum NodeType {
    TEXT = "text",
    IMAGE = "image",
}

type ZIndex = {
    max: number;
    min: number;
};

type Position = {
    x: number;
    y: number;
};

type Dimensions = {
    width: number;
    height: number;
};

type BaseNode = {
    id: string;
    position: Position;
    dimensions: Dimensions;
    zIndex: number;
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

type SlideContextType = {
    editorDimensions: Dimensions;
    selectedNode: Node | null;
    nodes: Node[];
    zIndex: ZIndex;
};

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    addText: () => void;
    updateNodeData: (newData: Node) => void;
    addImage: (image: Image) => void;
};

export const SlideContext = createContext<SlideContextType | null>(null);
export const SlideActionsContext =
    createContext<SlideActionsContextType | null>(null);

export const SlideContextProvider = ({ children }: { children: ReactNode }) => {
    const [editorDimensions, setEditorDimensions] = useState<Dimensions>({
        width: 0,
        height: 0,
    });
    const [currNode, setCurrNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [zIndex, setZIndex] = useState<ZIndex>({ max: 0, min: 0 });

    function setSelectedNode(node: Node | null) {
        setCurrNode(node);
    }

    function addText() {
        const text: Text = {
            id: nanoid(),
            type: NodeType.TEXT,
            position: {
                x: 10,
                y: 10,
            },
            dimensions: {
                width: 500,
                height: 100,
            },
            zIndex: zIndex.max + 1,
            value: "",
        };

        setZIndex((prevZIndex) => ({ ...prevZIndex, max: text.zIndex }));
        setNodes((prevNodes) => [...prevNodes, text]);
    }

    function updateNodeData(newData: Node) {
        setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === newData.id ? newData : n))
        );
    }

    function addImage(image: Image) {
        setNodes([...nodes, image]);
    }

    const values = useMemo(
        () => ({ editorDimensions, selectedNode: currNode, nodes, zIndex }),
        [editorDimensions, currNode, nodes, zIndex]
    );

    const actions = useMemo(
        () => ({
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNodeData,
            addImage,
        }),
        [
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNodeData,
            addImage,
        ]
    );

    return (
        <SlideContext.Provider value={values}>
            <SlideActionsContext.Provider value={actions}>
                {children}
            </SlideActionsContext.Provider>
        </SlideContext.Provider>
    );
};
