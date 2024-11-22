import { IFrame, ISetting } from '@/types';

import * as s from './iframe.module.scss';
import { NodeSettings } from '@/components/node-settings';
import { MouseEvent, useState } from 'react';
import { useSlideActionsContext } from '@/hooks/useSlideActionsContext';

type IFrameProps = {
    data: IFrame;
};

export function IFrame(props: IFrameProps) {
    const { data } = props;

    const{ deleteNode, copyNode } = useSlideActionsContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = (event: MouseEvent) => {
        event.preventDefault();
        setIsMenuOpen(true);
    }

    const closeMenu = () => setIsMenuOpen(false);
    
    const remove = () => {
        deleteNode(data.id);
        closeMenu();
    }

    const copy = () => {
        copyNode(data.id);
        closeMenu();
    }

    const settings: ISetting[] = [
        {key: 'Delete', label: 'Удалить', onClick: remove},
        {key: 'Copy', label: 'Скопировать', onClick: copy},
        {key: 'Close', label: 'Закрыть', onClick: closeMenu},
    ]
    return (
        <div
            className={s.iframeWrapper}
            onContextMenu={openMenu}
            onBlur={closeMenu}
        >
            <iframe className={s.iframe} src={data.src} title="iframe" data-not-draggable />

            {isMenuOpen && <NodeSettings options={settings} />}
        </div>
    );
}
