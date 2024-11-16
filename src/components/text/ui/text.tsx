import {
    MouseEvent as IMouseEvent,
    DragEvent,
    useEffect,
    useRef,
    useState,
    ChangeEvent,
} from "react";
import clsx from "clsx";

import { useSlideContext } from "@/hooks/useSlideContext";
import { useSlideActionsContext } from "@/hooks/useSlideActionsContext";
import { Text } from '@/types';
import { isInsideElement } from "@/utils/sizes";

import * as s from "./text.module.scss";

type TextProps = {
    data: Text;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    isEditable?: boolean
};

const resizeDots = [
    "topLeft",
    "topMiddle",
    "topRight",
    "rightMiddle",
    "rightBottom",
    "bottomMiddle",
    "bottomLeft",
    "leftMiddle",
];

export function Text(props: TextProps) {
    const { data, onDragStart, onDragEnd, isEditable = true } = props;

    const { editorDimensions, zIndex, selectedNode } = useSlideContext();
    const { setSelectedNode, updateNode } = useSlideActionsContext();

    const outerRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const dotsRef = useRef<HTMLDivElement | null>(null);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

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
                case "topLeft":
                    finalWidth = startWidthPercent - endWidthPercent;
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionX = startXPercent + endXPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case "topMiddle":
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case "topRight":
                    finalWidth = startWidthPercent + endWidthPercent;
                    finalHeight = startHeightPercent - endHeightPercent;
                    finalPositionY = startYPercent + endYPercent;
                    break;
                case "rightMiddle":
                    finalWidth = startWidthPercent + endWidthPercent;
                    break;
                case "rightBottom":
                    finalWidth = startWidthPercent + endWidthPercent;
                    finalHeight = startHeightPercent + endHeightPercent;
                    break;
                case "bottomMiddle":
                    finalHeight = startHeightPercent + endHeightPercent;
                    break;
                case "bottomLeft":
                    finalWidth = startWidthPercent - endWidthPercent;
                    finalHeight = startHeightPercent + endHeightPercent;
                    finalPositionX = startXPercent + endXPercent;
                    break;
                case "leftMiddle":
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
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    const wrapperHandlers = {
        onClick: () => setSelectedNode(data),
        onDragStart: handleDragStart,
        onDragEnd,
    }

    const textareaHandlers = {
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
            updateNode({ ...data, value: e.target.value }),
    }

    return (
        <div
            ref={outerRef}
            style={{
                width: data.dimensionsPercent.width + "%",
                height: data.dimensionsPercent.height + "%",
                left: data.positionPercent.x + "%",
                top: data.positionPercent.y + "%",
                zIndex: isSelected ? zIndex.max + 1 : data.zIndex,
            }}
            className={clsx(s.root, {
                [s._selected]: isSelected,
            })}
            draggable={isEditable}
            {...(isEditable && {...wrapperHandlers})}
        >
            <textarea
                ref={textareaRef}
                className={s.textarea}
                placeholder="Введите текст"
                value={data.value}
                {...(isEditable && {...textareaHandlers})}
                {...(!!data.style && {style: data.style})}
                onChange={(e) => textareaHandlers.onChange(e)}
            />

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
    );
}
