import { memo } from 'react';
import * as s from './styled.module.scss';

function Notes() {
    return <div className={s.root}>Заметки</div>;
}

export default memo(Notes);