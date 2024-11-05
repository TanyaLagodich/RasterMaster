import { DragEvent as IDragEvent, useEffect, useRef, useState } from "react";

import { useSlideContext } from "@/hooks/useSlideContext";
import { useSlideActionsContext } from "@/hooks/useSlideActionsContext";
import { Node as SlideNode, NodeType } from "@/context/slideContext";

import { Text } from "@/components/text";

import * as s from "./slide-editor.module.scss";

export function SlideEditor() {
    const { nodes } = useSlideContext();
    const { setEditorDimensions, setSelectedNode, updateNodeData } =
        useSlideActionsContext();

    const editorRef = useRef<HTMLDivElement | null>(null);
    const dragOffsetRef = useRef({ x: 0, y: 0 });

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

        updateNodeData({
            ...node,
            positionPercent: { x: newXPercent, y: newYPercent },
        });
    }

    return (
        <div ref={editorRef} className={s.root}>
            {nodes.map((node) =>
                node.type === NodeType.TEXT ? (
                    <Text
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
