import { memo, FC, useState, useRef } from 'react';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { SlidePreview } from '@/components/slide-preview';
import { useAppContext } from '@/hooks/useAppContext';
import * as s from './styled.module.scss';

const Sidebar: FC = () => {
  const { mediator, slides, currentSlide } = useSlideMediator();
  const [ draggableIndex, setDraggableIndex ] = useState<number | null>(null);
  const [ draggableElement, setDraggableElement ] = useState<HTMLDivElement | null>(null);
  const { isNumerationShown } = useAppContext();
  const [ hoverableIndex, setHoverableIndex ] = useState<{ index: number; position: 'before' | 'after' } | null>(null);

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const dragStart = (e: React.DragEvent<HTMLElement>, index: number) => {
    const target = e.target as HTMLElement;
    setDraggableElement(target.closest(`.${s.slideWrapper}`) as HTMLDivElement);
    setDraggableIndex(index);
  }

  const onDragOver = (e: React.DragEvent<HTMLElement>, index: number) => {
    e.preventDefault();

    if (!draggableElement) return;

    const target = (e.target as HTMLElement).closest(`.${s.slideWrapper}`) as HTMLDivElement;
    if (!target) return;

    const targetCoords = target.getBoundingClientRect();

    const movingUp = draggableIndex > index;
    const coverage = targetCoords.top + targetCoords.height / 2

    const mouseY = e.clientY;
    if (movingUp) {
        if (mouseY > coverage) {
          setHoverableIndex({ index, position: 'after' });
        } else {
          setHoverableIndex({ index, position: 'before' });
        }
      } else {
        if (mouseY < coverage) {
          setHoverableIndex({ index, position: 'before' });
        } else {
          setHoverableIndex({ index, position: 'after' });
        }
      }

  }

  const drop = () => {
    if (draggableIndex === null || hoverableIndex === null) return;
    const updatedSlides = [...slides];
    const targetIndex = hoverableIndex.index;

    const temp = updatedSlides[draggableIndex];
    updatedSlides[draggableIndex] = updatedSlides[targetIndex];
    updatedSlides[targetIndex] = temp;

    mediator.rebuild(updatedSlides);
    setDraggableIndex(null);
    setHoverableIndex(null);
  }

    const dragLeave = (e: React.DragEvent) => {
        const relatedTarget = e.relatedTarget as HTMLElement;

        if (
            relatedTarget === sidebarRef.current ||
            sidebarRef.current?.contains(relatedTarget)
        ) {
            return;
        }

        setHoverableIndex(null);
    };

    return (
        <aside
            ref={sidebarRef}
            className={s.root}
            onDragLeave={dragLeave}
            onDrop={drop}
        >
            {slides.map((slide, index) => {
                const { id } = slide;

                return (
                    <div
                        className={`${s.slideWrapper} ${draggableIndex === index ? s.draggableSlideWrapper : ''}`}
                        key={id}
                        data-index={index}
                        draggable={true}
                        onClick={() => mediator.selectSlide(slide)}
                        onDragStart={(event) => dragStart(event, index)}
                        onDragOver={(event) => onDragOver(event, index)}
                    >
                        {hoverableIndex && hoverableIndex?.index === index && hoverableIndex.position === 'before' && (
                            <Divider className={`${s.dropLine}`} style={{ bottom: '83%' }} />
                        )}
                        <SlidePreview
                            isActive={currentSlide?.id === id}
                            slide={slide}
                        />
                        {hoverableIndex && hoverableIndex?.index === index && hoverableIndex.position === 'after' && (
                            <Divider className={`${s.dropLine}`} style={{ top: '83%' }} />
                        )}

                        {isNumerationShown && <p className={s.pageNumber}>{index + 1}</p>}
                    </div>
                )
            })}

            <Button
                type="primary"
                icon={<PlusOutlined />}
                className={s.button}
                onClick={() => mediator.pushSlide()}
            >
                Новый слайд
            </Button>
        </aside>
    );
}

export default memo(Sidebar);
