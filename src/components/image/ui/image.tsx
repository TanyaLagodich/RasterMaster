import {
    MouseEvent as IMouseEvent,
    DragEvent,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Checkbox, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';

import { useSlideContext } from '@/hooks/useSlideContext';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { Image } from '@/types';
import { isInsideElement } from '@/utils/sizes';

import * as s from './image.module.scss';

type ImageProps = {
    data: Image;
    onDragStart: (e: DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: DragEvent<HTMLDivElement>) => void;
    isEditable: boolean;
};

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

export function Image(props: ImageProps) {
    const { data, onDragStart, onDragEnd, isEditable = true } = props;

    const { editorDimensions, zIndex, selectedNode } = useSlideContext();
    const { setSelectedNode, updateNode } = useSlideActionsContext();

    const outerRef = useRef<HTMLDivElement | null>(null);
    const dotsRef = useRef<HTMLDivElement | null>(null);
    const stylerRef = useRef<HTMLDivElement | null>(null);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

    function handleDragStart(e: DragEvent<HTMLDivElement>) {
        if (!dotsRef.current || !stylerRef.current) return;

        const isDot = [...dotsRef.current.children].some(
            (dot: HTMLDivElement) =>
                isInsideElement(
                    e.clientX,
                    e.clientY,
                    dot.getBoundingClientRect()
                )
        );
        const isStyler = isInsideElement(
            e.clientX,
            e.clientY,
            stylerRef.current.getBoundingClientRect()
        );

        if (isDot || isStyler) {
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

    function handleBRNumberChange(value: number) {
        const digits = value ? String(value) : '0';
        const unit = data.style.borderRadius.match(/px|%/)?.[0] ?? 'px';

        updateNode({
            ...data,
            style: {
                ...data.style,
                borderRadius: digits + unit,
            },
        });
    }

    function handleBRUnitChange(unit: string) {
        const digits = data.style.borderRadius.match(/\d+/)?.[0] ?? '0';

        updateNode({
            ...data,
            style: {
                ...data.style,
                borderRadius: digits + unit,
            },
        });
    }

    function handleCoverChange(e: CheckboxChangeEvent) {
        updateNode({
            ...data,
            style: {
                ...data.style,
                cover: e.target.checked,
            },
        });
    }

    return (
        <div
            ref={outerRef}
            style={{
                width: data.dimensionsPercent.width + '%',
                height: data.dimensionsPercent.height + '%',
                left: data.positionPercent.x + '%',
                top: data.positionPercent.y + '%',
                zIndex: isSelected ? zIndex.max + 1 : data.zIndex,
            }}
            className={clsx(s.root, {
                [s._selected]: isSelected,
                [s._cover]: data.style.cover,
            })}
            onClick={() => setSelectedNode(data)}
            draggable={isEditable}
            onDragStart={handleDragStart}
            onDragEnd={onDragEnd}
        >
            <img
                className={s.image}
                style={{
                    borderRadius: data.style.borderRadius,
                }}
                src={data.src}
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

            <div ref={stylerRef} className={s.styler}>
                <InputNumber
                    defaultValue={0}
                    style={{ width: '66px' }}
                    onChange={handleBRNumberChange}
                />
                <Select
                    defaultValue="px"
                    style={{ width: '60px' }}
                    options={[
                        { value: 'px', label: 'px' },
                        { value: '%', label: '%' },
                    ]}
                    onChange={handleBRUnitChange}
                />
                <Checkbox onChange={handleCoverChange}>
                    Пропорционально
                </Checkbox>
            </div>
        </div>
    );
}
