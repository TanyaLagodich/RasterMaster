import { useState, useEffect, useRef } from "react";
import { Button, Typography, Space } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useSlideMediator } from "@/hooks/useSlideMediatorContext";
import * as s from "./slideshow.module.scss";

export function SlideShow({ onExit }: { onExit: () => void }) {
    const { slides } = useSlideMediator();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isEndScreen, setIsEndScreen] = useState(false); // Флаг для экрана завершения
    const slideshowRef = useRef<HTMLDivElement>(null);

    // Навигация по слайдам
    const navigateSlide = (direction: "next" | "prev") => {
        setCurrentIndex((prevIndex) => {
            if (direction === "next") {
                if (isEndScreen) {
                    onExit(); // Если на экране завершения, выходим
                    return prevIndex;
                }

                if (prevIndex < slides.length - 1) {
                    return prevIndex + 1;
                } else {
                    setIsEndScreen(true); // Показываем экран завершения
                    return prevIndex;
                }
            }

            if (direction === "prev") {
                setIsEndScreen(false); // Убираем экран завершения, если вернулись назад
                return Math.max(prevIndex - 1, 0);
            }

            return prevIndex;
        });
    };

    // Переход в полноэкранный режим
    const enterFullscreen = () => {
        slideshowRef.current?.requestFullscreen?.();
    };

    // Завершение полноэкранного режима
    const exitFullscreen = () => {
        document.fullscreenElement && document.exitFullscreen();
        onExit();
    };

    // Обработка изменения полноэкранного состояния
    const handleFullscreenChange = () => {
        if (!document.fullscreenElement) {
            onExit();
        }
    };

    // Навигация по клавишам
    const handleKeyDown = (e: KeyboardEvent) => {
        e.stopPropagation();
        if (e.key === "ArrowRight") {
            navigateSlide("next");
        } else if (e.key === "ArrowLeft") {
            navigateSlide("prev");
        } else if (e.key === "Escape") {
            exitFullscreen();
        }
    };

    // Включение полноэкранного режима при монтировании
    useEffect(() => {
        enterFullscreen();

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("keydown", handleKeyDown);

            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    // Логика отображения контента
    const renderSlideContent = () => {
        if (isEndScreen) {
            return (
                <div className={s.endScreen}>
                    <Typography className={s.endText}>
                        Конец слайдшоу. Щелкните чтобы выйти.
                    </Typography>
                </div>
            );
        }

        return (
            <img
                src={slides[currentIndex].preview}
                alt={`Slide ${currentIndex + 1}`}
                className={s.image}
            />
        );
    };

    // Логика клика по экрану
    const handleScreenClick = () => {
        if (isEndScreen) {
            onExit();
        } else {
            navigateSlide("next");
        }
    };

    return (
        <div
            ref={slideshowRef}
            className={s.root}
            onClick={handleScreenClick}
        >
            <div className={s.slideContent}>{renderSlideContent()}</div>

            {!isEndScreen && ( 
                <div className={s.controls}>
                    <Space>
                        <Button
                            icon={<LeftOutlined />}
                            onClick={(e) => {
                                e.stopPropagation();
                                navigateSlide("prev");
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
                                navigateSlide("next");
                            }}
                        />
                    </Space>
                </div>
            )}
        </div>
    );
}
