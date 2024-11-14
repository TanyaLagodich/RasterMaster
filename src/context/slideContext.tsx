import { createContext, ReactNode, useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { NodeStrategyFactory } from '@/factories/node-strategy';
import type { Slide, Dimensions, Image, Text } from '@/types';
import { ZIndex, NodeType, Node } from '@/types';
import { useSlideMediator } from "@/hooks/useSlideMediatorContext";

interface SlideContext extends Omit<Slide, 'update' | 'clone'> {
   selectedNode: Node | null;
};

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    addText: () => void;
    updateNode: (newData: Node) => void;
    addImage: (image: Image) => void;
    updatePreview: (preview: string) => void;
};

export const SlideContext = createContext<SlideContext | null>(null);
export const SlideActionsContext =
    createContext<SlideActionsContextType | null>(null);

export const SlideContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentSlide, mediator } = useSlideMediator();
    const [editorDimensions, setEditorDimensions] = useState<Dimensions>(currentSlide?.editorDimensions);
    const [currNode, setCurrNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>(currentSlide?.nodes || []);
    const [zIndex, setZIndex] = useState<ZIndex>(currentSlide?.zIndex || { min: 0, max: 100 });
    const [preview] = useState<string>(currentSlide?.preview || '');
    const [id] = useState<string>(currentSlide?.id || nanoid());

    function setSelectedNode(node: Node | null) {
        setCurrNode(node);
    }
    
    function addNode(type: NodeType): Node {
      const newNode = currentSlide.addNode(type);
      mediator.editCurrentSlide(currentSlide);
      return newNode;
          // const strategy = NodeStrategyFactory.createStrategy(type);
          // const newNode = strategy.addNode();

          // setZIndex((prevZIndex) => ({ ...prevZIndex, max: newNode.zIndex }));
          // setNodes((prevNodes) => [...prevNodes, newNode]);
          // mediator.editCurrentSlide({
          //   ...currentSlide,
          //   nodes: [...currentSlide.nodes, newNode],
          // });
      }

    function addText() {
      // const text = NodeFactory.createNode(NodeType.TEXT);
        // const text: Text = {
        //     id: nanoid(),
        //     type: NodeType.TEXT,
        //     positionPercent: {
        //         x: 10,
        //         y: 10,
        //     },
        //     dimensionsPercent: {
        //         width: 30,
        //         height: 20,
        //     },
        //     zIndex: zIndex.max + 1,
        //     value: "",
        // };
        // 
        // console.log(text);

        // setZIndex((prevZIndex) => ({ ...prevZIndex, max: text.zIndex }));
        // setNodes((prevNodes) => [...prevNodes, text]);
        // updateSlide({
        //     ...currentSlide,
        //     nodes,
        //     zIndex,
        // });
        // updateCurrentSlide({
        //     ...currentSlide,
        //     nodes,
        //     zIndex,
        // });
    }

    function updateNode(newData: Node) {
      currentSlide.updateNode(newData);
        setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === newData.id ? newData : n))
        );
        mediator.editCurrentSlide(currentSlide);
    }

    function addImage(image: Image) {
        setNodes([...nodes, image]);
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
            addNode,
            updateNode,
            updatePreview,
        }),
        [
            editorDimensions,
            currNode,
            nodes,
            zIndex,
            preview,
            id,
            currentSlide,
            addNode,
            updateNode,
            updatePreview,
        ]
    );

    const actions = useMemo(
        () => ({
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNode,
            addImage,
            updatePreview,
        }),
        [
            setEditorDimensions,
            setSelectedNode,
            addText,
            updateNode,
            addImage,
            updatePreview,
        ]
    );

    function updatePreview(preview: string) {
        currentSlide.update({
            ...currentSlide,
            preview,
        });
        mediator.editCurrentSlide(currentSlide);
    }

    return (
        <SlideContext.Provider value={values}>
            <SlideActionsContext.Provider value={actions}>
                {children}
            </SlideActionsContext.Provider>
        </SlideContext.Provider>
    );
};
