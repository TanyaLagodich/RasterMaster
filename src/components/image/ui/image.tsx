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
import { ISetting, Image } from '@/types';
import { isInsideElement } from '@/utils/sizes';
import { NodeSettings } from '@/components/node-settings';
import * as s from './image.module.scss';

type ImageProps = {
    data: Image;
    isEditable: boolean;
};

export function Image(props: ImageProps) {
    const { data, isEditable = true } = props;

    const { selectedNode } = useSlideContext();
    const { setSelectedNode, updateNode, deleteNode } = useSlideActionsContext();

    const stylerRef = useRef<HTMLDivElement | null>(null);

    const [isSelected, setIsSelected] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setIsSelected(data.id === selectedNode?.id);
        }
    }, [data, selectedNode, isEditable]);

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

    function openMenu(event: IMouseEvent) {
        event.preventDefault();
        setIsMenuOpen(true);
    }

    function closeMenu() {
        setIsMenuOpen(false)
    }

    const remove = () => {
        deleteNode(data.id);
        closeMenu();
    }

    const copy = () => {
        copyNode(data.id);
        closeMenu();
    }

    const settings: ISetting[] = [
        {key: 'Delete', label: 'Удалить', onClick: remove},
        {key: 'Copy', label: 'Скопировать', onClick: copy},
        {key: 'Close', label: 'Закрыть', onClick: closeMenu},
    ]

    return (
        <>
            <img
                className={s.image}
                style={{
                    borderRadius: data.style.borderRadius,
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

            {isMenuOpen && <NodeSettings options={settings} />}
        </>
    );
}
