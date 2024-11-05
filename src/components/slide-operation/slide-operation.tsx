import { SlideOperation } from "@/entities/slides/types";
import { FC, MouseEvent } from "react";

interface IOperationProps {
    label: string;
    id: string;
    className: string;
    method: SlideOperation;
    onClose: () => void;
}

const OperationItem: FC<IOperationProps> = ({
    label,
    className,
    id,
    method,
    onClose,
}) => {
    const onClick = (event: MouseEvent) => {
        method(event, id);
        onClose();
    }
    return (
        <div onClick={onClick} className={className}>
            {label}
        </div>
    )
}

export default OperationItem;