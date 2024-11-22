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
import { NodeSettings } from '@/components/node-settings';
import * as s from './text.module.scss';

type TextProps = {
    data: Text;
    isEditable: boolean;
};

export function Text(props: TextProps) {
    const { data, isEditable = true } = props;

    const { selectedNode } = useSlideContext();
    const { updateNode, deleteNode, copyNode } = useSlideActionsContext();

    const textFieldRef = useRef<ReactQuill>(null);

    const [isSelected, setIsSelected] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

    const textareaHandlers = {
        onChange: (value: string) => updateNode({ ...data, value }),
    };

    useEffect(() => {
        const editorRoot = textFieldRef.current.getEditor().root;
        const quillContainer = editorRoot?.closest('.ql-container');
        if (quillContainer) {
            quillContainer.setAttribute('data-not-draggable', 'true');
        }
    }, []);
    
    const settings = [
        {key: 'Delete', label: 'Удалить', onClick: remove},
        {key: 'Copy', label: 'Скопировать', onClick: copy},
        {key: 'Close', label: 'Закрыть', onClick: closeMenu},
    ]

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
                {...(!!data.style && {style: data.style})}
            />
    );
}
