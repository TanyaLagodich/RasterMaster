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
        const editorRoot = textFieldRef.current.getEditor().root;
        const quillContainer = editorRoot?.closest('.quill');
        if (quillContainer) {
            quillContainer.setAttribute('data-not-draggable', 'true');
        }
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
                modules={{
                    toolbar: [
                        [{ font: [] }, { size: [] }],
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        ['bold', 'italic', 'underline', 'strike'], // Make sure bold, italic, underline are in the toolbar
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['link'],
                        ['clean'],
                    ],
                }}
            />
    );
}
