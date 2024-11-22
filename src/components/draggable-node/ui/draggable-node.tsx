import React, { DragEvent, MouseEvent as IMouseEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Node } from '@/types';
import { useSlideContext } from '@/hooks/useSlideContext';

import * as s from './draggable-node.module.scss';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { isInsideElement } from '@/utils/sizes';
import { computeNodeStyle } from '@/utils/computedNodeStyles';

interface DraggableNodeProps {
    data: Node;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    children: React.ReactElement;
}

const resizeDots = [
    'topLeft',
    'topMiddle',
    'topRight',
    'rightMiddle',
    'rightBottom',
    'bottomMiddle',
    'bottomLeft',
    'leftMiddle',
];

export function DraggableNode({ data, onDragStart, onDragEnd, children }: DraggableNodeProps) {
    const [isSelected, setIsSelected] = useState(false);
    const [isDraggable, setIsDraggable] = useState(true);

    const { editorDimensions, zIndex, selectedNode } = useSlideContext();
    const { setSelectedNode, updateNode } = useSlideActionsContext();

    const outerRef = useRef<HTMLDivElement | null>(null);
    const dotsRef = useRef<HTMLDivElement | null>(null);
    const childrenRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setIsSelected(data.id === selectedNode?.id);
    }, [data, selectedNode]);

    function handleDragStart(e: DragEvent<HTMLDivElement>) {
        if (!isSelected || !isDraggable || !dotsRef.current) {
            e.preventDefault();
            return;
        };

        const isDot = [...dotsRef.current.children].some((dot: HTMLDivElement) =>
            isInsideElement(e.clientX, e.clientY, dot.getBoundingClientRect())
        );

        if (isDot) {
            e.preventDefault();
            return;
        }

        onDragStart(e);
    }

    function handleDotMouseDown(
        e: IMouseEvent<HTMLDivElement, MouseEvent>,
        corner: string
    ) {
        const { clientX: startX, clientY: startY } = e;
        const { width: startWidthPercent, height: startHeightPercent } =
            data.dimensionsPercent;
        const { x: startXPercent, y: startYPercent } = data.positionPercent;

        function handleMouseMove(e: MouseEvent) {
            const { clientX: endX, clientY: endY } = e;
            let finalWidth = startWidthPercent,
                finalHeight = startHeightPercent;
            let finalPositionX = startXPercent,
                finalPositionY = startYPercent;

            const endWidthPercent =
                ((endX - startX) / editorDimensions.width) * 100;
            const endHeightPercent =
                ((endY - startY) / editorDimensions.height) * 100;
            const endXPercent =
                ((endX - startX) / editorDimensions.width) * 100;
            const endYPercent =
                ((endY - startY) / editorDimensions.height) * 100;

            switch (corner) {
                case 'topLeft':
                    finalWidth = startWidthPercent - endWidthPercent;
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionX = startXPercent + endXPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case 'topMiddle':
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case 'topRight':
                    finalWidth = startWidthPercent + endWidthPercent;
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case 'rightMiddle':
                    finalWidth = startWidthPercent + endWidthPercent;
                    break;
                case 'rightBottom':
                    finalWidth = startWidthPercent + endWidthPercent;
                    finalHeight = startHeightPercent + endHeightPercent;
                    break;
                case 'bottomMiddle':
                    finalHeight = startHeightPercent + endHeightPercent;
                    break;
                case 'bottomLeft':
                    finalWidth = startWidthPercent - endWidthPercent;
                    finalHeight = startHeightPercent + endHeightPercent;
                    finalPositionX = startXPercent + endXPercent;
                    break;
                case 'leftMiddle':
                    finalWidth = startWidthPercent - endWidthPercent;
                    finalPositionX = startXPercent + endXPercent;
                    break;
            }

            updateNode({
                ...data,
                dimensionsPercent: {
                    width: finalWidth,
                    height: finalHeight,
                },
                positionPercent: { x: finalPositionX, y: finalPositionY },
            });
        }

        function handleMouseUp() {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handlePointerDown = (e) => {
        const notDraggableElement = (e.target as HTMLElement)?.closest('[data-not-draggable]');
        setIsDraggable(!notDraggableElement);
    }

    return (
        <div
            ref={outerRef}
            style={computeNodeStyle(data, isSelected, isSelected ? zIndex.max : data.zIndex)}
            className={clsx(s.root, {
                [s._selected]: isSelected,
            })}
            draggable
            onPointerDown={handlePointerDown}
            onClick={() => setSelectedNode(data)}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
        >
            {children}
            <div ref={dotsRef} className={s.resizeDotsContainer}>
                {resizeDots.map((resizeDot) => (
                    <div
                        key={resizeDot}
                        className={clsx(s.resizeDot, s[`_${resizeDot}`])}
                        onMouseDown={(e) => handleDotMouseDown(e, resizeDot)}
                    />
                ))}
            </div>
        </div>
        )
    }
