import { SlideOperation } from "@/entities/slides/types";
import { FC, MouseEvent } from "react";

interface IOperationProps {
    label: string;
    id: string;
    className: string;
    method: (...args: any[]) => void;
    onClose: () => void;
    close?: boolean
}

const OperationItem: FC<IOperationProps> = ({
    label,
    className,
    id,
    method,
    onClose,
    close = true,
}) => {
    const onClick = (event: MouseEvent) => {
        method(event, id);
        if (close) {
            console.log('Here');
            
            // onClose();
        }
    }

    // console.log(close);
    
    return (
        <div onClick={onClick} className={className}>
            {label}
        </div>
    )
}

export default OperationItem;