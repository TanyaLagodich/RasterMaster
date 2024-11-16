import { createContext, ReactNode, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type { Slide, Dimensions } from '@/types';
import { ZIndex, NodeType, Node } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

interface SlideContext extends Omit<Slide, 'update' | 'clone'> {
   selectedNode: Node | null;
}

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
    updateNode: (newData: Node) => void;
    updatePreview: (preview: string) => void;
};

export const SlideContext = createContext<SlideContext | null>(null);
export const SlideActionsContext =
    createContext<SlideActionsContextType | null>(null);

export const SlideContextProvider = ({ children }: { children: ReactNode }) => {
    const { currentSlide, mediator } = useSlideMediator();
    const [editorDimensions, setEditorDimensions] = useState<Dimensions>(
        currentSlide?.editorDimensions
    );
    const [currNode, setCurrNode] = useState<Node | null>(null);
    const [nodes, setNodes] = useState<Node[]>(currentSlide?.nodes || []);
    const [zIndex, setZIndex] = useState<ZIndex>(
        currentSlide?.zIndex || { min: 0, max: 100 }
    );
    const [preview] = useState<string>(currentSlide?.preview || '');
    const [id] = useState<string>(currentSlide?.id || nanoid());

    function setSelectedNode(node: Node | null) {
        setCurrNode(node);
    }

    async function addNode(type: NodeType): Promise<Node> {
      const newNode = await currentSlide.addNode(type);
      mediator.editCurrentSlide(currentSlide);
      return newNode;
  }

    function updateNode(newData: Node) {
        currentSlide.updateNode(newData);
        setNodes((prevNodes) =>
            prevNodes.map((n) => (n.id === newData.id ? newData : n))
        );
        mediator.editCurrentSlide(currentSlide);
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
            updateNode,
            updatePreview,
        }),
        [
            setEditorDimensions,
            setSelectedNode,
            updateNode,
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
