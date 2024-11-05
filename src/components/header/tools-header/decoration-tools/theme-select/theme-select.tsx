import React, { useState } from 'react';
import { Space, Dropdown, Button } from 'antd';
import type { MenuProps } from 'antd';

export function ThemeSelect()  {
    const [theme, setTheme] = useState<string>('Тема 1');
    const [open, setOpen] = useState<boolean>(false);

    const handleThemeChange = (value: string) => {
        setTheme(value);
    };


    const handleMenuClick = (e: any) => {
        setTheme(e.key);
    };

    const applyToAll = () => {
        setOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            label: 'Тема 1',
            key: 'Тема 1',
        },
        {
            label: 'Тема 2',
            key: 'Тема 2',
        },
        {
            label: 'Тема 3',
            key: 'Тема 3',
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
};
