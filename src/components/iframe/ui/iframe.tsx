import { IFrame } from '@/types';

import * as s from './iframe.module.scss';
import { NodeSettings } from '@/components/node-settings';

type IFrameProps = {
    data: IFrame;
};

export function IFrame(props: IFrameProps) {
    const { data } = props;

    const openMenu = (event: IMouseEvent) => {
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

    const settings = [
        {key: 'Delete', label: 'Удалить', onClick: remove},
        {key: 'Copy', label: 'Скопировать', onClick: copy},
        {key: 'Close', label: 'Закрыть', onClick: closeMenu},
    ]
    return (
        <div className={s.iframeWrapper}>
            <iframe className={s.iframe} src={data.src} title="iframe" data-not-draggable />
        </div>
    );
}
