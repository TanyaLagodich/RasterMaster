import { Card, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons'
import { IOptionSlideOperations, Slide, Node } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { useState, MouseEvent, useRef, useEffect } from "react";
import SlideOperations from '@/components/slide-operations';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import * as s from './slide-preview.module.scss';

export function SlidePreview ({
    slide,
    isActive,
}: {slide: Slide; isActive: boolean}) {
    const { mediator } = useSlideMediator();

    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const [areTemplatesShown, setAreTemplatesShown] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const ref = useRef<HTMLDivElement>(null);

    const closeOptions = () => {
        setAreOptionsOpen(false);
    };

    const slideOperations: IOptionSlideOperations[] = [
        { key: 'add', label: 'Создать', onClick: (event) => {
            mediator.createSlide(event, slide.id);
            closeOptions();
        }},
        { key: 'duplicate', label: 'Дублировать', onClick: (event) => {
            mediator.duplicateSlide(event, slide.id, slide);
            closeOptions();
        }},
        { key: 'remove', label: 'Удалить', onClick: (event) => {
            mediator.deleteSlide(event, slide.id);
            closeOptions();
        }},
        // { key: "templates", label: "Макеты", onClick: (event) => {
        //     event.stopPropagation();
        //     setAreTemplatesShown(prev => !prev);
        // }},
    ];

    const toggleOptions = (event: MouseEvent) => {
        event.stopPropagation();
        setAreOptionsOpen(prev => !prev);
    };

    useOutsideClick(
        ref,
        closeOptions,
        {isCancelled: !areOptionsOpen},
    )

    useEffect(() => {
        setPreviewUrl(slide.preview ? URL.createObjectURL(slide.preview) : '');
        console.log(slide.preview);
    }, [slide.preview]);

    return (
        <div>
            <Card
                size="small"
                className={`${s.root} ${isActive ? s.active : ''}`}
                cover={slide.preview ? <img alt="preview" src={previewUrl} height="100%" /> : ''}
                hoverable
            >
                {/*<div*/}
                {/*    className=""*/}
                {/*>*/}
                {/*    {slide.nodes.map((node) => renderNode(node))}*/}
                {/*</div>*/}
                <Button
                    className={s.button}
                    icon={<EllipsisOutlined />}
                    onClick={toggleOptions}
                />
            </Card>

            {areOptionsOpen && (
                <SlideOperations
                    options={slideOperations}
                    id={slide.id}
                    onClose={closeOptions}
                    areTemplatesShown={areTemplatesShown}
                    createSlide={mediator.createSlide}
                />
            )}
        </div>
    );
}
