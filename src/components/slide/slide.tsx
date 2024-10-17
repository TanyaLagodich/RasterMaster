import { FC, useEffect, useRef, useState } from "react";
import * as s from "./styled.module.scss";
import { IOptionSlideOperations, ISlideProps } from "../../entities/slides/types";
import SlideOperations from "../slide-operations";

export const Slide: FC<ISlideProps> = ({
    type,
    id,
    index,
    createSlide,
    removeSlide,
    duplicateSlide,
}) => {
    const className = [
        s.root,
        type === 'big'? s.big : s.small,
    ].join(' ')

    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const toggleOptions = () => {
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

    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        if (!areOptionsOpen) return;

        const closeOutside = (event) => {
            if (event.target === ref.current) {
                closeOptions();
            }
        }

        document.addEventListener('click', closeOutside);

        return () => document.removeEventListener('click', closeOutside);
    }, []);

    return (
        <div className={className} ref={ref}>
            {/* На время разработки */}
            <p>{id.slice(0, 5)}</p>
            
            {type === 'small' &&
                // TODO: Найти SVG-иконку три точки
                <p
                    className={s.settings}
                    style={{fontSize: 20}}
                    onClick={toggleOptions}
                >
                    ...
                </p>
            }

            {areOptionsOpen && type === 'small' &&
                <div ref={ref}>
                    <SlideOperations
                        options={slideOperationsOptions}
                        id={id}
                        onClose={closeOptions}
                    />
                </div>
            }

            {type === 'big' &&
                <p className={s.page}>{(index ?? 0) + 1}</p>
            }
        </div>
    )
}