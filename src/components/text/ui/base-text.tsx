import React, {
    useEffect,
    useRef,
} from 'react';
import ReactQuill from 'react-quill';
import clsx from 'clsx';

import { Text } from '@/types';

import * as s from './text.module.scss';

type TextProps = {
    data: Text;
    onChange: (value: string, delta, source, editor) => void;
    isSelected: boolean;
    isEditable: boolean;
};

export function BaseText(props: TextProps) {
    const { data, onChange, isSelected, isEditable } = props;

    const textFieldRef = useRef<ReactQuill>(null);

    useEffect(() => {
        const editorRoot = textFieldRef.current.getEditor().root;
        const quillContainer = editorRoot?.closest('.ql-container');
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
            readOnly={!isEditable}
            value={data.value}
            onChange={onChange}
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
