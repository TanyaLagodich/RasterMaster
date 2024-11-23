import {useEffect, useRef, useState} from 'react';
import { Checkbox, InputNumber, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import clsx from 'clsx';
import { useSlideContext } from '@/hooks/useSlideContext';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';
import { Image } from '@/types';
import * as s from './image.module.scss';

type ImageProps = {
    data: Image;
    isEditable: boolean;
};

export function Image(props: ImageProps) {
    const { data, isEditable = true } = props;

    const { selectedNode } = useSlideContext();
    const { updateNode } = useSlideActionsContext();

    const stylerRef = useRef<HTMLDivElement | null>(null);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

    function handleBRNumberChange(value: number) {
        const digits = value ? String(value) : '0';
        const unit = data.imgStyle.borderRadius.match(/px|%/)?.[0] ?? 'px';

        updateNode({
            ...data,
            style: {
                ...data.style,
                borderRadius: digits + unit,
            },
        });
    }

    function handleBRUnitChange(unit: string) {
        const digits = data.imgStyle.borderRadius.match(/\d+/)?.[0] ?? '0';

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
            imgStyle: {
                ...data.imgStyle,
                cover: e.target.checked,
            },
        });
    }

    return (
        <>
            <img
                className={s.image}
                style={{
                    borderRadius: data.imgStyle.borderRadius,
                }}
                src={data.src}
            />

            <div
                ref={stylerRef}
                className={clsx(s.styler, {
                    [s.stylerVisible]: isSelected,
                })}
                data-not-draggable
            >
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
        </>
    );
}
