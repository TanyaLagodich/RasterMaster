import { useState } from 'react';
import { Space, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useSlideMediator } from "@/hooks/useSlideMediatorContext";
import { theme1, theme2, theme3 } from '@/utils/images';

const THEMES = {
    'Тема 1': theme1,
    'Тема 2': theme2,
    'Тема 3': theme3,
    'Убрать тему': undefined
}

export function ThemeSelect()  {
    const [theme, setTheme] = useState<string>('Тема 1');
    const [open, setOpen] = useState<boolean>(false);

    const { currentSlide, slides, mediator } = useSlideMediator();

    const handleMenuClick = ({ key }) => {
        if (!currentSlide) {
            return;
        }
        setTheme(key);
        currentSlide.update({
            backgroundImage: THEMES[key],
        })
        mediator.editCurrentSlide(currentSlide);
        setOpen(false);
    };

    const applyToAll = () => {
        if (!slides.length) {
            return;
        }
        slides.forEach((slide) => {
            slide.update({ backgroundImage: THEMES[theme] });
            mediator.editCurrentSlide(currentSlide);
        });
        mediator.editCurrentSlide(currentSlide);
        setOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Тема 1',
            key: 'Тема 1',
            onClick: handleMenuClick,
        },
        {
            label: 'Тема 2',
            key: 'Тема 2',
            onClick: handleMenuClick,
        },
        {
            label: 'Тема 3',
            key: 'Тема 3',
            onClick: handleMenuClick,
        },
        {
            label: 'Убрать тему',
            key: 'Убрать тему',
            onClick: handleMenuClick,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Button type="primary" onClick={applyToAll}>
                    Применить ко всем
                </Button>
            ),
            key: 'apply',
        },
    ];

    return (
        <Space>
            <Dropdown
                menu={{ items, onClick: handleMenuClick }}
                trigger={['click']}
            >
                <Button onClick={applyToAll}>{theme || 'Тема'} ▼ {open}</Button>
            </Dropdown>
        </Space>
    );
}
