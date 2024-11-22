import { DragEvent as IDragEvent, useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { Node as SlideNode } from '@/types';
import { NodeRenderer } from '@/components/node-renderer';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppContext } from '@/hooks/useAppContext';
import * as s from './slide-editor.module.scss';

export function SlideEditor() {
    const { mediator, currentSlide } = useSlideMediator();
    const { nodes, backgroundColor } = currentSlide;
    const { setEditorDimensions, setSelectedNode, updateNode, updatePreview } =
        useSlideActionsContext();
    const { isNumerationShown } = useAppContext();
    
    const editorRef = useRef<HTMLDivElement | null>(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    const debouncedGeneratePreview = useDebounce(generatePreview, 5000);

    useEffect(() => debouncedGeneratePreview(), [nodes, backgroundColor]);

    useEffect(() => {
        function onClick(e: MouseEvent) {
            if (editorRef.current === e.target) {
                setSelectedNode(null);
            }
        }

        function onDragOver(e: DragEvent) {
            e.preventDefault();
        }

        function onResize() {
            if (!editorRef.current) return;

            setEditorDimensions({
                width: editorRef.current.offsetWidth,
                height: editorRef.current.offsetHeight,
            });
        }

        document.addEventListener('mousedown', onClick);
        document.addEventListener('dragover', onDragOver);
        window.addEventListener('resize', onResize);
        onResize();
        return () => {
            document.removeEventListener('mousedown', onClick);
            document.removeEventListener('dragover', onDragOver);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    function dragStartHandler(e: IDragEvent<HTMLDivElement>) {
        const nodeRect = e.currentTarget.getBoundingClientRect();
        dragOffsetRef.current.x = e.clientX - nodeRect.left;
        dragOffsetRef.current.y = e.clientY - nodeRect.top;
    }

    function dragEndHandler(e: IDragEvent<HTMLDivElement>, node: SlideNode) {
        if (!editorRef.current) return;

        const editorRect = editorRef.current.getBoundingClientRect();
        const newX = e.clientX - editorRect.left - dragOffsetRef.current.x;
        const newY = e.clientY - editorRect.top - dragOffsetRef.current.y;

        const newXPercent = (newX / editorRect.width) * 100;
        const newYPercent = (newY / editorRect.height) * 100;

        updateNode({
            ...node,
            positionPercent: { x: newXPercent, y: newYPercent },
        });
    }

    async function generatePreview() {
        try {
            if (editorRef.current) {
                const filter = (node: HTMLElement) => {
                    if (/resizeDot/.test(node.className) || node.classList?.contains('ql-toolbar')) {
                        return false;
                    }
                    return true;
                };

                const dataUrl = await toPng(editorRef.current, { filter });
                updatePreview(dataUrl);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div
            ref={editorRef}
            className={s.root}
            style={{ backgroundColor: currentSlide.backgroundColor }}
        >
            {nodes.map((node: SlideNode) =>
                <NodeRenderer
                    key={node.id}
                    node={node}
                    isEditable={true}
                    onDragStart={dragStartHandler}
                    onDragEnd={dragEndHandler}
                />
            )}

            {isNumerationShown && <p className={s.pageNumber}>{mediator.getIndex()}</p>}
        </div>
    );
}
