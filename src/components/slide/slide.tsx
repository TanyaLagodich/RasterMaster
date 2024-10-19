import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import * as s from "./styled.module.scss";
import { IOptionSlideOperations, ISlideProps } from "../../entities/slides/types";
import SlideOperations from "../slide-operations";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export const Slide: FC<ISlideProps> = ({
    type,
    id,
    index,
    createSlide,
    removeSlide,
    duplicateSlide,
}) => {
    const isBig = type === 'big';
    const isSmall = !isBig;

    const className = [
        s.root,
        isBig ? s.big : s.small,
    ].join(' ')

    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const ref = useRef();

    const toggleOptions = (event: MouseEvent) => {
        event.stopPropagation();
        setAreOptionsOpen(prev => !prev);
    }

    const closeOptions = () => {
        setAreOptionsOpen(false);
    }

    const slideOperationsOptions: IOptionSlideOperations[] = [
        {key: 'add', label: 'Создать', method: createSlide},
        {key: 'duplicate', label: 'Дублировать', method: duplicateSlide},
        {key: 'remove', label: 'Удалить', method: removeSlide},
        {key: 'templates', label: 'Макеты'},           
    ]

    useOutsideClick(
        ref,
        closeOptions,
        {isCancelled: !areOptionsOpen},
    )

    return (
        <div className={className}>
            {isSmall && 
                <div className={s.paranja} ref={ref}/>
            }

            {/* На время разработки */}
            <p>{id.slice(0, 5)}</p>
            
            {isSmall &&
                // TODO: Найти SVG-иконку три точки
                <p
                    className={s.settings}
                    style={{fontSize: 20}}
                    onClick={toggleOptions}
                >
                    ...
                </p>
            }

            {areOptionsOpen && isSmall &&
                <SlideOperations
                    options={slideOperationsOptions}
                    id={id}
                    onClose={closeOptions}
                />
            }

            {isBig &&
                <p className={s.page}>{(index ?? 0) + 1}</p>
            }
        </div>
    )
}