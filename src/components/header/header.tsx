import { useState } from 'react';
import { Button, Dropdown, Input, Modal, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { TAB } from '@/context/appContext';
import { useAppActionsContext } from '@/hooks/useAppActionsContext';
import { useSlideContext } from '@/hooks/useSlideContext';
import { useAppContext } from '@/hooks/useAppContext';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import { NodeType } from '@/types';
import { exportToHtml } from '@/utils/htmlExport';

import * as s from './styled.module.scss';

export function Header({
   onOenSlideShow
}) {
    const { activeTab } = useAppContext();
    const { setActiveTab } = useAppActionsContext();
    const { addNode } = useSlideContext();
    const { slides } = useSlideMediator();

    const [isIframeModal, setIsIframeModal] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('');

    function closeIframeModal() {
        setIsIframeModal(false);
    }

    function submitIframeUrl() {
        addNode(NodeType.IFRAME, { src: iframeUrl });
        setIframeUrl('');
        closeIframeModal();
    }

    const fileMenuItems: MenuProps['items'] = [
        { key: 'new', label: 'Создать' },
        {
            key: 'open',
            label: 'Экспорт в HTML',
            onClick: () => exportToHtml(slides),
        },
        { key: 'save', label: 'Пригласить' },
    ];

    const insertionMenuItems: MenuProps['items'] = [
        { key: 'text', label: 'Текст', onClick: () => addNode(NodeType.TEXT) },
        {
            key: 'image',
            label: 'Изображение',
            onClick: () => addNode(NodeType.IMAGE),
        },
        {
            key: 'iframe',
            label: 'iframe',
            onClick: () => setIsIframeModal(true),
        },
    ];

    return (
        <>
            <nav className={s.root}>
                <ul className={s.tabs}>
                    <Space>
                        <Dropdown
                            menu={{ items: fileMenuItems }}
                            placement="bottomLeft"
                            arrow={{ pointAtCenter: true }}
                        >
                            <Button type="text">
                                <Space>
                                    {TAB.FILE}
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Dropdown
                            menu={{ items: insertionMenuItems }}
                            placement="bottomLeft"
                            arrow={{ pointAtCenter: true }}
                        >
                            <Button type="text">
                                <Space>
                                    {TAB.INSERTION}
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>

                        <Button
                        type={
                            activeTab === TAB.SLIDESHOW ? 'primary' : 'text'
                        }
                        onClick={onOenSlideShow}
                    >
                        Слайдшоу
                    </Button>{Object.keys(TAB)
                            .slice(2)
                            .map((tab: keyof typeof TAB) => (
                                <Button
                                    type={
                                        activeTab === TAB[tab]
                                            ? 'primary'
                                            : 'text'
                                    }
                                    onClick={() => setActiveTab(TAB[tab])}
                                    key={tab}
                                >
                                    {TAB[tab]}
                                </Button>
                            ))}
                    </Space>
                </ul>
            </nav>

            <Modal
                open={isIframeModal}
                onOk={submitIframeUrl}
                onCancel={closeIframeModal}
                onClose={closeIframeModal}
            >
                <Input
                    className={s.iframeInput}
                    placeholder="Введите url"
                    value={iframeUrl}
                    onChange={(e) => setIframeUrl(e.target.value)}
                />
            </Modal>
        </>
    );
}
