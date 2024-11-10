import { createContext, ReactNode, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { useSlidesContext } from "@/hooks/useSlidesContext";
import type { Slide, Dimensions, Image, Text } from '@/types';
import { ZIndex, NodeType, Node } from '@/types';

interface SlideContext extends Slide {
   selectedNode: Node | null;
};

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    addText: () => void;
    updateNodeData: (newData: Node) => void;
    addImage: (image: Image) => void;
    updatePreview: (preview: string) => void;
};

export const SlideContext = createContext<SlideContext | null>(null);
export const SlideActionsContext =
    createContext<SlideActionsContextType | null>(null);

export const SlideContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentSlide, updateSlide, updateCurrentSlide } = useSlidesContext();
    const [editorDimensions, setEditorDimensions] = useState<Dimensions>(currentSlide?.editorDimensions);
    const [currNode, setCurrNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>(currentSlide?.nodes || []);
    const [zIndex, setZIndex] = useState<ZIndex>(currentSlide?.zIndex || { min: 0, max: 100 });
    const [preview] = useState<string>(currentSlide?.preview || '');
    const [id] = useState<string>(currentSlide?.id || nanoid());

    function setSelectedNode(node: Node | null) {
        setCurrNode(node);
    }

    function addText() {
        const text: Text = {
            id: nanoid(),
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
        updateSlide({
            ...currentSlide,
            nodes,
            zIndex,
        });
        updateCurrentSlide({
            ...currentSlide,
            nodes,
            zIndex,
        });
    }

    function updateNodeData(newData: Node) {
        setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === newData.id ? newData : n))
        );
        updateSlide({
            ...currentSlide,
            nodes,
        })
        updateCurrentSlide({
            ...currentSlide,
            nodes,
        });
    }

    function addImage(image: Image) {
        setNodes([...nodes, image]);
    }

    const values = useMemo(
        () => ({ editorDimensions, selectedNode: currNode, nodes, zIndex, preview, id, currentSlide }),
        [editorDimensions, currNode, nodes, zIndex, preview, id, currentSlide]
    );

    const actions = useMemo(
        () => ({
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNodeData,
            addImage,
            updatePreview,
        }),
        [
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNodeData,
            addImage,
            updatePreview,
        ]
    );

    function updatePreview(dataUrl: string) {
        updateCurrentSlide({
            ...currentSlide,
            preview: dataUrl,
        });
    }

    return (
        <SlideContext.Provider value={values}>
            <SlideActionsContext.Provider value={actions}>
                {children}
            </SlideActionsContext.Provider>
        </SlideContext.Provider>
    );
};
