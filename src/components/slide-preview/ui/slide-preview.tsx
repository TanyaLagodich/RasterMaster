import { Card, Dropdown, Button, type MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { IOptionSlideOperations, Slide } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { useState, MouseEvent, useRef } from 'react';
import SlideOperations from '@/components/slide-operations';
import * as s from './slide-preview.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';

export function SlidePreview ({
    slide,
    isActive,
}: {slide: Slide; isActive: boolean}) {
    const { mediator } = useSlideMediator();

    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const [areTemplatesShown, setAreTemplatesShown] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const slideOperations: IOptionSlideOperations[] = [
        { key: "add", label: "Создать", method: () => mediator.createSlide(slide.id)},
        { key: "duplicate", label: "Дублировать", method: () => mediator.duplicateSlide(slide.id, slide)},
        { key: "remove", label: "Удалить", method: () => mediator.deleteSlide(slide.id)},
        { key: "templates", label: "Макеты", method: () => mediator.createSlide(slide.id)},
    ];

    const closeOptions = () => {
        setAreOptionsOpen(false);
    };

    const toggleOptions = (event: MouseEvent) => {
        event.stopPropagation();
        setAreOptionsOpen(prev => !prev);
    };

    useOutsideClick(
        ref,
        closeOptions,
        {isCancelled: !areOptionsOpen},
    )
  
    return (
        <div>
            <div className={s.paranja} ref={ref}/>

            <Card
                size="small"
                className={`${s.root} ${isActive ? s.active : ''}`}
                cover={slide.preview ? <img alt="preview" src={slide.preview} height="100%" /> : ''}
                hoverable
            >
                <Button
                    className={s.button}
                    icon={<EllipsisOutlined />}
                    onClick={toggleOptions}
                />
            </Card>

            {areOptionsOpen &&
                <SlideOperations
                    options={slideOperations}
                    id={slide.id}
                    onClose={closeOptions}
                    createSlide={mediator.createSlide}
                />
            }
        </div>
    );
}
