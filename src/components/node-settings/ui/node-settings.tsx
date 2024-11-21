import { ISetting } from '@/entities/slides/types';
import { FC } from 'react';
import * as s from './styled.module.scss';

interface IProps {
    options: ISetting[],
    onClose?: () => void;
}

export const NodeSettings: FC<IProps> = ({options}) => {
    return (
        <ul className={s.root}>
            {options.map(({key, label, action}) => 
                <li 
                    key={key}
                    className={s.option}
                    onClick={action}
                >
                    {label}
                </li>
            )}
        </ul>
    )
}