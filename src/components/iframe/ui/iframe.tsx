import { IFrame } from '@/types';

import * as s from './iframe.module.scss';

type IFrameProps = {
    data: IFrame;
};

export function IFrame(props: IFrameProps) {
    const { data } = props;

    return (
        <div className={s.iframeWrapper}>
            <iframe className={s.iframe} src={data.src} title="iframe" data-not-draggable />
        </div>
    );
}
