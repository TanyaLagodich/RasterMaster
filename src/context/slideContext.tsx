import { createContext, ReactNode, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import type { Slide, Dimensions } from '@/types';
import { ZIndex, NodeType, Node } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

interface SlideContext extends Omit<Slide, 'backgroundColor' | 'update' | 'clone'> {
    selectedNode: Node | null;
}

type SlideActionsContextType = {
    setEditorDimensions: (dimensions: Dimensions) => void;
    setSelectedNode: (node: Node | null) => void;
    updateNode: (newData: Node) => void;
    updatePreview: (preview: string) => void;
    deleteNode: (id: string) =>  void;
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
    const [zIndex, _] = useState<ZIndex>(
        currentSlide?.zIndex || { min: 0, max: 100 }
    );
    const [preview] = useState<string>(currentSlide?.preview || '');
    const [id] = useState<string>(currentSlide?.id || nanoid());

    function setSelectedNode(node: Node | null) {
        setCurrNode(node);
    }

    async function addNode(
        type: NodeType,
        params?: Partial<Node>
    ): Promise<Node> {
        const newNode = await currentSlide.addNode(type, params);
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

    function deleteNode(id: string) {
        currentSlide.deleteNode(id);
        setNodes((prevNodes) =>
            prevNodes.filter((n) => (n.id === id))
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
            deleteNode,
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
            deleteNode,
        ]
    );

    const actions = useMemo(
        () => ({
            setEditorDimensions,
            setSelectedNode,
            updateNode,
            updatePreview,
            deleteNode,
        }),
        [setEditorDimensions, setSelectedNode, updateNode, updatePreview, deleteNode]
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
