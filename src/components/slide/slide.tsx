import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import * as s from "./styled.module.scss";
import { IOptionSlideOperations, ISlideProps } from "../../entities/slides/types";
import SlideOperations from "../slide-operations";
import { SlideEditor } from "./slide-editor";
import clsx from "clsx";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import EditIcon from '@/assets/edittt.svg';

export const Slide: FC<ISlideProps> = ({
    view,
    id,
    nodes = [],
    index,
    createSlide,
    removeSlide,
    duplicateSlide,
}) => {
    const isBig = view === 'big';
    const isSmall = !isBig;

    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const [areTemplatesShown, setAreTemplatesShown] = useState(false);

    console.log(areTemplatesShown)

    const ref = useRef();

    const toggleOptions = (event: MouseEvent) => {
        event.stopPropagation();
        setAreOptionsOpen((prev) => !prev);
    };

    const closeOptions = () => {
        console.log('call closeOptions');
        setAreOptionsOpen(false);
    };

    const slideOperationsOptions: IOptionSlideOperations[] = [
        { key: "add", label: "Создать", method: createSlide, close: true },
        { key: "duplicate", label: "Дублировать", method: duplicateSlide, close: true },
        { key: "remove", label: "Удалить", method: removeSlide, close: true },
        { key: "templates", label: "Макеты", method: () => setAreTemplatesShown(prev => !prev), close: false },
    ];

    useOutsideClick(
        ref,
        closeOptions,
        {isCancelled: !areOptionsOpen},
    )

    return (
        <div
            className={clsx(s.root, {
                [s.big]: view === "big",
                [s.small]: view === "small",
            })}
        >
            {isSmall &&
                <div className={s.paranja} ref={ref}/>
            }

            {/* На время разработки */}
            {/* <p style={{zIndex: 1000}}>{id.slice(0, 5)}</p> */}

            {isSmall &&
                // TODO: Найти SVG-иконку три точки
                <p
                    className={s.settings}
                    style={{ fontSize: 20, zIndex: 100 }}
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
                    areTemplatesShown={areTemplatesShown}
                    createSlide={createSlide}
                />
            }

            <SlideEditor nodes={nodes} isEditable={view === 'big'} />

            {/* {isBig &&
                <p className={s.page}>{(index ?? 0) + 1}</p>
            } */}
        </div>
    );
};
