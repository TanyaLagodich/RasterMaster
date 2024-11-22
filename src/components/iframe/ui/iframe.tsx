import { IFrame } from '@/types';

import * as s from './iframe.module.scss';

type IFrameProps = {
    data: IFrame;
};

export function IFrame(props: IFrameProps) {
    const { data } = props;

    return (
        <iframe className={s.iframe} src={data.src} title="iframe" />
    );
}
