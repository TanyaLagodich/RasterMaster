import { IOptionSlideOperations, SlideOperation } from "@/types";
import { FC } from "react";

import * as s from "./styled.module.scss";

interface IPropsMenu {
    options: IOptionSlideOperations[],
    id: string;
    onClose: () => void;
}

const SlideOperations: FC<IPropsMenu> = ({options, id, onClose}) => {
    const onAction = (method: SlideOperation) => {
        method(id);
        onClose();
    }

    return (
        <ul className={s.root}>
            {options.map(({key, label, method}) => (
                <li
                    key={key}
                    onClick={() => onAction(method)}
                    className={s.option}
                >
                    {label}
                </li>
            ))}
         </ul>
    )
}

export default SlideOperations;