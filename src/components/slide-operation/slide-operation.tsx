import { FC, MouseEvent } from 'react';
import * as s from './styled.module.scss';

interface IOperationProps {
    label: string;
    key: string;
    id: string;
    className: string;
    action: (...args: any[]) => void;
    onClose: () => void;
    close?: boolean
}

const OperationItem: FC<IOperationProps> = ({
    label,
    key,
    className,
    id,
    action,
    onClose,
}) => {
    const onClick = (event: MouseEvent) => {
        action(event, id);
        onClose();
    }
    
    return (
        <li
            // {...(key !== 'Templates' && {onClick})}
            // {...(key === 'Templates' && {onHover})}
            onClick={onClick}
            className={className}
        >
            {label}
        </li>
    )
}

export default OperationItem;