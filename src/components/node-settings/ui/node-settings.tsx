import { ISetting } from '@/entities/slides/types';
import { FC, MouseEvent } from 'react';
import { Template } from '@/entities/templates/types';
import * as s from './styled.module.scss';

interface IProps {
    options: ISetting[],
    onClose: () => void;
}

export const NodeSettings: FC<IProps> = ({options, onClose}) => {
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
            {/* <li onClick={onClose}>
                Закрыть
            </li> */}
        </ul>
    )
}