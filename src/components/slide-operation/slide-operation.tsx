import { FC, MouseEvent } from 'react';
import * as s from './styled.module.scss';

interface IOperationProps {
    label: string;
    key: string;
    id: string;
    className: string;
    method: (...args: any[]) => void;
    onClose: () => void;
    close?: boolean
}

const OperationItem: FC<IOperationProps> = ({
    label,
    key,
    className,
    id,
    method,
    onClose,
}) => {
    const onClick = (event: MouseEvent) => {
        method(event, id);
        onClose();
    }

    const onHover = () => {
        
    }
    
    return (
        <div
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