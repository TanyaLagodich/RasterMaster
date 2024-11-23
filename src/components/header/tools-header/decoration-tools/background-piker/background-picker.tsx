import { useEffect, useMemo, useState } from 'react';
import { Button, ColorPicker, Space } from 'antd';
import type { ColorPickerProps, GetProp } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { isColorLight} from '@/utils/isColorLight';

type Color = Extract<GetProp<ColorPickerProps, 'value'>, string | { cleared: any }>;

export function BackgroundPicker() {
    const { currentSlide, slides, mediator } = useSlideMediator();
    const [color, setColor] = useState<Color>('#ffffff');
    const [open, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (currentSlide) {
            setColor(() => currentSlide.backgroundColor);
        }
    }, [currentSlide]);

    const bgColor = useMemo<string>(
        () => (typeof color === 'string' ? color : color!.toHexString()),
        [color]
    );

    const applyToCurrentSlide = () => {
        if (!currentSlide) {
            return;
        }

        currentSlide.update({
            backgroundColor: bgColor,
        });
        mediator.editCurrentSlide(currentSlide);
        setIsOpen(false);
    }

    const applyToAllSlides = () => {
        if (!slides.length) {
            return;
        }

        slides.forEach((slide) => {
            slide.update({ backgroundColor: bgColor });
            mediator.editCurrentSlide(currentSlide);
        });
        setIsOpen(false);
    };

    const customPanelRender = (panel) => (
        <div>
            {panel}
            <Space
                style={{ marginTop: 10, width: '100%', justifyContent: 'space-between' }}
                align="center"
            >
                <Button type="primary" onClick={applyToCurrentSlide}>
                    OK
                </Button>
                <Button onClick={applyToAllSlides}>
                    Применить ко всем
                </Button>
            </Space>
        </div>
    );

    const isLight = useMemo(() => isColorLight(bgColor), [bgColor]);
    const textColor = isLight ? '#000' : '#fff'; // Чёрный для светлого фона, белый для тёмного

    const btnStyle: React.CSSProperties = {
        backgroundColor: bgColor,
        color: textColor,
        border: 'none',
    };

    return (
        <ColorPicker
            open={open}
            value={color}
            panelRender={customPanelRender}
            allowClear
            showText
            onOpenChange={setIsOpen}
            onChange={setColor}
        >
            <Space>
                <Button type="primary" style={btnStyle} icon={<BgColorsOutlined />}>
                    Фон
                </Button>
            </Space>
        </ColorPicker>
    );
}
