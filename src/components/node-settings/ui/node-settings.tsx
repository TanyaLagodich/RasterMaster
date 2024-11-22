import { FC } from 'react';
import * as s from './styled.module.scss';
import { ISetting } from '@/types';

interface IProps {
    options: ISetting[],
    onClose?: () => void;
}

export const NodeSettings: FC<IProps> = ({options}) => {
    return (
        <ul className={s.root}>
            {options.map(({key, label, onClick}) => 
                <li 
                    key={key}
                    className={s.option}
                    onClick={onClick}
                >
                    {label}
                </li>
            )}
        </ul>
    )
}