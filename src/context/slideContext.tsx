import { createContext, ReactNode, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { useSlidesContext } from "@/hooks/useSlidesContext";
import type { Slide, Dimensions, Image, Text } from "@/types";
import { ZIndex, NodeType, Node } from "@/types";

interface SlideContext extends Slide {
    selectedNode: Node | null;
}

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    addText: () => void;
    addImage: () => void;
    updateNodeData: (newData: Node) => void;
    updatePreview: (preview: string) => void;
};

export const SlideContext = createContext<SlideContext | null>(null);
export const SlideActionsContext =
    createContext<SlideActionsContextType | null>(null);

export const SlideContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentSlide, updateSlide, updateCurrentSlide } =
        useSlidesContext();
    const [editorDimensions, setEditorDimensions] = useState<Dimensions>(
        currentSlide?.editorDimensions
    );
    const [currNode, setCurrNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>(currentSlide?.nodes || []);
    const [zIndex, setZIndex] = useState<ZIndex>(
        currentSlide?.zIndex || { min: 0, max: 100 }
    );
    const [preview] = useState<string>(currentSlide?.preview || "");
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

    function addImage() {
        const image: Image = {
            id: nanoid(),
            type: NodeType.IMAGE,
            positionPercent: {
                x: 30,
                y: 30,
            },
            dimensionsPercent: {
                width: 20,
                height: 20,
            },
            zIndex: zIndex.max + 1,
            src: "",
            style: {
                borderRadius: "0px",
                cover: false,
            },
        };

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        fileInput.addEventListener("change", (e) => {
            const file = (e.target as HTMLInputElement).files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const result = e.target?.result;

                    if (typeof result === "string") {
                        image.src = result;
                    } else if (result instanceof ArrayBuffer) {
                        const blob = new Blob([result], { type: e.type });
                        image.src = URL.createObjectURL(blob);
                    }

                    const updatedZIndex = { ...zIndex, max: image.zIndex };
                    setZIndex(updatedZIndex);
                    const updatedNodes = [...nodes, image];
                    setNodes(updatedNodes);
                    updateSlide({
                        ...currentSlide,
                        nodes: updatedNodes,
                        zIndex: updatedZIndex,
                    });
                    updateCurrentSlide({
                        ...currentSlide,
                        nodes: updatedNodes,
                        zIndex: updatedZIndex,
                    });
                };

                reader.readAsDataURL(file);
            }
        });

        fileInput.click();
    }

    function updateNodeData(newData: Node) {
        setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === newData.id ? newData : n))
        );
        updateSlide({
            ...currentSlide,
            nodes,
        });
        updateCurrentSlide({
            ...currentSlide,
            nodes,
        });
    }

    const values = useMemo(
        () => ({
            editorDimensions,
            selectedNode: currNode,
            nodes,
            zIndex,
            preview,
            id,
            currentSlide,
        }),
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
