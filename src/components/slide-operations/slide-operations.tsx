import { IOptionSlideOperations } from "@/entities/slides/types";
import { FC } from "react";
import OperationItem from "../slide-operation/slide-operation";

import * as s from "./styled.module.scss";

interface IProps {
    options: IOptionSlideOperations[],
    id: string;
    onClose: () => void;
}

const SlideOperations: FC<IProps> = ({options, id, onClose}) => {
    return (
        <div className={s.root}>
            {options.map(({key, label, method}) => (
                <OperationItem 
                    key={key}
                    method={method}
                    onClose={onClose}
                    className={s.option}
                    label={label}
                    id={id}
                />
            ))}
         </div>
    )
}

export default SlideOperations;