import { createContext, CSSProperties, ReactNode, useMemo, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

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

export type Node = {
    id: string;
    type: NodeType;
    positionPercent: Position;
    dimensionsPercent: Dimensions;
    zIndex: number;
    value: string;
    style?: CSSProperties
};

type SlideContextType = {
    editorDimensions: Dimensions;
    selectedNode: Node | null;
    nodes: Node[];
    zIndex: ZIndex;
};

export interface ISlideContent {
    id: string;
    preview: string,
    nodes: Node[] | [],
    editorDimensions: Dimensions,
    zIndex: ZIndex,
  }

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    addText: () => void;
    updateNodeData: (newData: Node) => void;
    addImage: (image: Node) => void;
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
        const text: Node = {
            id: uuidv4(),
            type: NodeType.TEXT,
            positionPercent: {
                x: 10,
                y: 10,
            },
            dimensionsPercent: {
                width: 30,
                height: 20,
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

    function addImage(image: Node) {
        setNodes(prevNodes => [...prevNodes, image]);
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
