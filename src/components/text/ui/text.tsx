import {
    MouseEvent as IMouseEvent,
    DragEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import clsx from "clsx";

import { useSlideContext } from "@/hooks/useSlideContext";
import { useSlideActionsContext } from "@/hooks/useSlideActionsContext";
import { Text } from "@/context/slideContext";
import { calcDimensions, calcPosition, isInsideElement } from "@/utils/sizes";

import * as s from "./text.module.scss";

type TextProps = {
    data: Text;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
};

export function Text(props: TextProps) {
    const { data, onDragStart, onDragEnd } = props;

    const { editorDimensions, zIndex, selectedNode } = useSlideContext();
    const { setSelectedNode, updateNodeData } = useSlideActionsContext();

    const outerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const dotsRef = useRef<HTMLDivElement | null>(null);

    const [isSelected, setIsSelected] = useState(false);
    const [dimensions, setDimensions] = useState<{
        width: string | number;
        height: string | number;
    }>({ width: 0, height: 0 });
    const [position, setPosition] = useState<{
        x: string | number;
        y: string | number;
    }>({ x: 0, y: 0 });

    useEffect(() => {
        setIsSelected(data.id === selectedNode?.id);
    }, [data, selectedNode]);

    useEffect(() => {
        setDimensions(calcDimensions(data.dimensions, editorDimensions));
        setPosition(calcPosition(data.position, editorDimensions));
    }, [data, editorDimensions]);

    function handleDragStart(e: DragEvent<HTMLDivElement>) {
        if (!textareaRef.current || !dotsRef.current) return;

        const isTextArea = isInsideElement(
            e.clientX,
            e.clientY,
            textareaRef.current.getBoundingClientRect()
        );

        const isDot = [...dotsRef.current.children].some(
            (dot: HTMLDivElement) =>
                isInsideElement(
                    e.clientX,
                    e.clientY,
                    dot.getBoundingClientRect()
                )
        );

        if (isTextArea || isDot) {
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
        const { width: startWidth, height: startHeight } = data.dimensions;
        const { x: startLeft, y: startTop } = data.position;

        console.log(startX, startY);

        function handleMouseMove(e: MouseEvent) {
            const { clientX: endX, clientY: endY } = e;
            let endWidth = startWidth,
                endHeight = startHeight;
            let endPositionY = startTop,
                endPositionX = startLeft;

            switch (corner) {
                case "topLeft":
                    endWidth = startWidth - (endX - startX);
                    endHeight = startHeight - (endY - startY);
                    endPositionX = startLeft + (endX - startX);
                    endPositionY = startTop + (endY - startY);
                    break;
                case "topMiddle":
                    endHeight = startHeight - (endY - startY);
                    endPositionY = startTop + (endY - startY);
                    break;
                case "topRight":
                    endWidth = startWidth + (endX - startX);
                    endHeight = startHeight - (endY - startY);
                    endPositionY = startTop + (endY - startY);
                    break;
                case "rightMiddle":
                    endWidth = startWidth + (endX - startX);
                    break;
                case "rightBottom":
                    endWidth = startWidth + (endX - startX);
                    endHeight = startHeight + (endY - startY);
                    break;
                case "bottomMiddle":
                    endHeight = startHeight + (endY - startY);
                    break;
                case "bottomLeft":
                    endWidth = startWidth - (endX - startX);
                    endHeight = startHeight + (endY - startY);
                    endPositionX = startLeft + (endX - startX);
                    break;
                case "leftMiddle":
                    endWidth = startWidth - (endX - startX);
                    endPositionX = startLeft + (endX - startX);
                    break;
            }

            updateNodeData({
                ...data,
                dimensions: { width: endWidth, height: endHeight },
                position: { x: endPositionX, y: endPositionY },
            });
        }

        function handleMouseUp() {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    return (
        <div
            ref={outerRef}
            style={{
                width: dimensions.width,
                height: dimensions.height,
                left: position.x,
                top: position.y,
                zIndex: isSelected ? zIndex.max + 1 : data.zIndex,
            }}
            className={clsx(s.root, {
                [s._selected]: isSelected,
            })}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
            onClick={() => setSelectedNode(data)}
        >
            <textarea
                ref={textareaRef}
                className={s.textarea}
                placeholder="Введите текст"
                value={data.value}
                onChange={(e) =>
                    updateNodeData({ ...data, value: e.target.value })
                }
            />

            <div ref={dotsRef} className={s.resizeDotsContainer}>
                <div
                    className={clsx(s.resizeDot, s._topLeft)}
                    onMouseDown={(e) => handleDotMouseDown(e, "topLeft")}
                />
                <div
                    className={clsx(s.resizeDot, s._topMiddle)}
                    onMouseDown={(e) => handleDotMouseDown(e, "topMiddle")}
                />
                <div
                    className={clsx(s.resizeDot, s._topRight)}
                    onMouseDown={(e) => handleDotMouseDown(e, "topRight")}
                />
                <div
                    className={clsx(s.resizeDot, s._rightMiddle)}
                    onMouseDown={(e) => handleDotMouseDown(e, "rightMiddle")}
                />
                <div
                    className={clsx(s.resizeDot, s._rightBottom)}
                    onMouseDown={(e) => handleDotMouseDown(e, "rightBottom")}
                />
                <div
                    className={clsx(s.resizeDot, s._bottomMiddle)}
                    onMouseDown={(e) => handleDotMouseDown(e, "bottomMiddle")}
                />
                <div
                    className={clsx(s.resizeDot, s._bottomLeft)}
                    onMouseDown={(e) => handleDotMouseDown(e, "bottomLeft")}
                />
                <div
                    className={clsx(s.resizeDot, s._leftMiddle)}
                    onMouseDown={(e) => handleDotMouseDown(e, "leftMiddle")}
                />
            </div>
        </div>
    );
}
