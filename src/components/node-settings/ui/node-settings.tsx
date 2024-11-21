import { ISetting } from '@/entities/slides/types';
import { FC, MouseEvent } from 'react';
import { Template } from '@/entities/templates/types';
import * as s from './styled.module.scss';

interface IProps {
    options: ISetting[],
    onClose?: () => void;
}

const settings = [
    {key: 'Delete', label: 'Удалить', action: () => {}},
]

export const NodeSettings: FC<IProps> = ({options, onClose}) => {
    return (
        <ul className={s.root}>
            {options.map(({key, label}) => 
                <li 
                    key={key}
                    className={s.option}
                >
                    {label}
                </li>
            )}
        </ul>
    )
}