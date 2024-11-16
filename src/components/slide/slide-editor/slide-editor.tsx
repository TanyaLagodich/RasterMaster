import { DragEvent as IDragEvent, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { useSlideActionsContext } from "@/hooks/useSlideActionsContext";

import { Node as SlideNode, NodeType } from "@/types";

import { Text } from "@/components/text";
import { Image } from "@/components/image";

import * as s from "./slide-editor.module.scss";
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { useDebounce } from "@/hooks/useDebounce";

export function SlideEditor() {
  const { currentSlide } = useSlideMediator();
  const { nodes } = currentSlide;
    const {
        setEditorDimensions,
        setSelectedNode,
        updateNode,
        updatePreview,
    } = useSlideActionsContext();

    const editorRef = useRef<HTMLDivElement | null>(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    const debouncedGeneratePreview = useDebounce(generatePreview, 5000);

    useEffect(() => {
        debouncedGeneratePreview();
    }, [nodes]);

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

        document.addEventListener("mousedown", onClick);
        document.addEventListener("dragover", onDragOver);
        window.addEventListener("resize", onResize);
        onResize();
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("dragover", onDragOver);
            window.removeEventListener("resize", onResize);
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
                const dataUrl = await toPng(editorRef.current);
                updatePreview(dataUrl);
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div ref={editorRef} className={s.root}>
            {nodes.map((node: SlideNode) =>
                node.type === NodeType.TEXT ? (
                    <Text
                        key={node.id}
                        data={node}
                        onDragStart={(e: IDragEvent<HTMLDivElement>) =>
                            dragStartHandler(e)
                        }
                        onDragEnd={(e: IDragEvent<HTMLDivElement>) => {
                            dragEndHandler(e, node);
                        }}
                    />
                ) : node.type === NodeType.IMAGE ? (
                    <Image
                        data={node}
                        onDragStart={(e: IDragEvent<HTMLDivElement>) =>
                        dragStartHandler(e)
                        }
                        onDragEnd={(e: IDragEvent<HTMLDivElement>) => {
                        dragEndHandler(e, node);
                        }}
                    />
                ) : (
                    <div></div>
                )
            )}
        </div>
    );
}
