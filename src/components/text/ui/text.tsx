import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import ReactQuill from 'react-quill';
import clsx from 'clsx';

import { useSlideContext } from '@/hooks/useSlideContext';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { Text } from '@/types';
import { isInsideElement } from '@/utils/sizes';

import * as s from './text.module.scss';

type TextProps = {
    data: Text;
    isEditable: boolean;

};

export function Text(props: TextProps) {
    const { data, isEditable = true } = props;

    const { selectedNode } = useSlideContext();
    const { updateNode } = useSlideActionsContext();

    const textFieldRef = useRef<ReactQuill>(null);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

    // function handleDragStart(e: DragEvent<HTMLDivElement>) {
    //     if (!textFieldRef.current || !dotsRef.current) return;
    //
    //     const isTextField = isInsideElement(
    //         e.clientX,
    //         e.clientY,
    //         textFieldRef.current.getEditor().root.getBoundingClientRect()
    //     );
    //
    //     const isDot = [...dotsRef.current.children].some(
    //         (dot: HTMLDivElement) =>
    //             isInsideElement(
    //                 e.clientX,
    //                 e.clientY,
    //                 dot.getBoundingClientRect()
    //             )
    //     );
    //
    //     if (isTextField || isDot) {
    //         e.preventDefault();
    //         return;
    //     }
    //
    //     onDragStart(e);
    // }

    // @ts-ignore
    const handleMouseDown = (e: React.MouseEvent) => {
        // Останавливаем событие для предотвращения драг-н-дропа
        if (!textFieldRef.current) return;

        const isTextField = isInsideElement(
            e.clientX,
            e.clientY,
            textFieldRef.current.getEditor().root.getBoundingClientRect()
        );

        if (isTextField) {
            e.stopPropagation();
        }
    };


    const textareaHandlers = {
        onChange: (value: string) => updateNode({ ...data, value }),
    };

    useEffect(() => {
        console.log(textFieldRef.current.getEditor().root, textFieldRef.current.getEditor().root.closest('.quill'));
        if (textFieldRef.current.getEditor().root) {
            textFieldRef.current.getEditor().root.closest('.quill').setAttribute('data-not-draggable', 'true');
        }
        // const handleDragStart = (e) => {
        //     e.stopPropagation();
        //     console.log('handleDragStart');
        // }

        // const mainWrapper = textFieldRef.current.getEditor().root.closest(`.${s.textField}`);
        // if (mainWrapper) {
        //     textFieldRef.current.getEditor().root.addEventListener('dragstart', handleDragStart);
        // }
        // console.log(textFieldRef.current.getEditor().root.closest(`.${s.textField}`));
        // textFieldRef.current.addEventListener('dragstart', handleDragStart);
    }, []);

    return (
            <ReactQuill
                ref={textFieldRef}
                className={clsx(s.textField, {
                    [s.textFieldSelected]: isSelected,
                    [s._toolbarBottom]: data.positionPercent.y < 20,
                })}
                theme="snow"
                value={data.value}
                onChange={(value) => textareaHandlers.onChange(value)}
                onFocus={() => updateNode({ ...data, isDraggable: false })}
                onBlur={() => updateNode({ ...data, isDraggable: true })}
            />
    );
}
