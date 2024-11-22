import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Typography, Space } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import * as s from './slideshow.module.scss';
import { NodeRenderer } from '@/components/node-renderer';

export function SlideShow({ onExit }: { onExit: () => void }) {
    const { slides } = useSlideMediator();
    const slideshowRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex >= slides.length) {
                exitFullscreen();
                return prevIndex;
            }
            return prevIndex + 1;
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            if (prevIndex <= 0) return prevIndex;
            return prevIndex - 1;
        });
    };

    const enterFullscreen = () => {
        slideshowRef.current?.requestFullscreen?.();
    };

    const exitFullscreen = () => {
        document.fullscreenElement && document.exitFullscreen();
        onExit();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        e.stopPropagation();

        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'Escape') {
            exitFullscreen();
        }
    };

    const fullscreenchange = () => {
        if (!document.fullscreenElement) onExit();
    }

    useEffect(() => {
        enterFullscreen();

        document.addEventListener('fullscreenchange', fullscreenchange)
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            if (document.fullscreenElement) {
                exitFullscreen();
            }
        };
    }, []);

    const renderSlideContent = () => {
        if (currentIndex >= slides.length) {
            return (
                <div className={s.endScreen}>
                    <Typography className={s.endText}>
                        Конец слайдшоу. Щелкните чтобы выйти.
                    </Typography>
                </div>
            );
        }

        return (
            <>
                {slides[currentIndex].nodes.map((node) => (
                    <NodeRenderer key={node.id} node={node} isEditable={false} />
                ))}
            </>
        );
    };

    return (
        <div
            ref={slideshowRef}
            className={s.root}
            onClick={nextSlide}
        >
            <div
                className={s.slideContent}
                style={{ backgroundColor: slides[currentIndex].backgroundColor }}
            >
                {renderSlideContent()}

                <div className={s.controls}>
                    <Space className={s.controlsWrapper}>
                        <Button
                            icon={<LeftOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                prevSlide();
                            }}
                            disabled={currentIndex === 0}
                        />
                        <Typography>
                            {Math.min(currentIndex + 1, slides.length)} из {slides.length}
                        </Typography>
                        <Button
                            icon={<RightOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                nextSlide();
                            }}
                            disabled={currentIndex === slides.length}
                        />
                    </Space>
                </div>
            </div>

        </div>
    );
}
