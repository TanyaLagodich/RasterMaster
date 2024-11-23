import React, {
    useEffect,
    useState,
} from 'react';

import { useSlideContext } from '@/hooks/useSlideContext';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { Text } from '@/types';

import { BaseText } from "@/components/text/ui/base-text";

type TextProps = {
    data: Text;
    isEditable: boolean;
};

export function Text(props: TextProps) {
    const { data, isEditable = true } = props;

    const { selectedNode } = useSlideContext();
    const { updateNode } = useSlideActionsContext();

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

    const textareaHandlers = {
        onChange: (value: string, delta, source, editor) => {
            updateNode({ ...data, value });
        }
    };

    return (
        <BaseText
            data={data}
            isSelected={isSelected}
            isEditable={isEditable}
            onChange={textareaHandlers.onChange}
        />
    );
}
