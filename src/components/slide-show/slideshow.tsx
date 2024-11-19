import { useState, useEffect, useRef, useCallback } from "react";
import { Button, Typography, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSlideMediator } from "@/hooks/useSlideMediatorContext";
import * as s from "./slideshow.module.scss";
import { NodeRenderer } from "@/components/node-renderer";

export function SlideShow({ onExit }: { onExit: () => void }) {
    const { slides } = useSlideMediator();
    const slideshowRef = useRef<HTMLDivElement>(null);
    const documentRef = useRef(document);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(currentIndex);
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    const nextSlide = useCallback(() => {
        if (currentIndex >= slides.length) {
            exitFullscreen();
            return;
        }
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => prevIndex - 1);
    }, []);

    const enterFullscreen = () => {
        slideshowRef.current?.requestFullscreen?.();
    };

    const exitFullscreen = () => {
        documentRef.current.fullscreenElement && documentRef.current.exitFullscreen();
        onExit();
    };

    const handleFullscreenChange = () => {
        if (!documentRef.current.fullscreenElement) {
            onExit();
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        console.log(currentIndex, currentIndexRef.current);
        e.stopPropagation();

        if (currentIndexRef.current >= slides.length && e.key === 'ArrowRight') {
            exitFullscreen();
            return;
        }
            if (e.key === "ArrowRight") {
                nextSlide();
            } else if (e.key === "ArrowLeft") {
                prevSlide();
            } else if (e.key === "Escape") {
                exitFullscreen();
            }
        }, [nextSlide, prevSlide, exitFullscreen, currentIndex]);

    useEffect(() => {
        enterFullscreen();

        documentRef.current.addEventListener("fullscreenchange", handleFullscreenChange);
        documentRef.current.addEventListener("keydown", handleKeyDown);

        return () => {
            documentRef.current.removeEventListener("fullscreenchange", handleFullscreenChange);
            documentRef.current.removeEventListener("keydown", handleKeyDown);

            if (documentRef.current.fullscreenElement) {
                documentRef.current.exitFullscreen();
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
                    <NodeRenderer key={node.id} node={node} />
                ))}
            </>
        );
    };

    const handleScreenClick = () => {
        if (currentIndex >= slides.length) {
            onExit();
        } else {
            nextSlide();
        }
    };

    return (
        <div
            ref={slideshowRef}
            className={s.root}
            onClick={handleScreenClick}
        >
            <div
                className={s.slideContent}
                style={{ backgroundColor: slides[currentIndex]?.backgroundColor }}
            >
                {renderSlideContent()}

                <div className={s.controls}>
                    <Space>
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
                        />
                    </Space>
                </div>
            </div>

        </div>
    );
}
