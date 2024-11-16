import { FC, MouseEvent, useEffect, useRef, useState } from "react";
import * as s from "./styled.module.scss";
import { IOptionSlideOperations, ISlideProps } from "../../entities/slides/types";
import SlideOperations from "../slide-operations";
import { SlideEditor } from "./slide-editor";
import clsx from "clsx";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { Card, Space } from 'antd';
import { SlideEmpty } from './slide-empty';
import { useSlideMediator  } from '@/hooks/useSlideMediatorContext';

export const Slide: FC = () => {
  const { currentSlide } = useSlideMediator();

    if (!currentSlide) {
        return <SlideEmpty />;
    }
    
    return (
      <div className={s.root}>
        <p style={{zIndex: 10000}}>{currentSlide.id.slice(0, 5)}</p>
        {currentSlide !== null ?
          <SlideEditor /> :
          <SlideEmpty />
        }
      </div>
    )
    // const isBig = type === 'big';
    // const isSmall = !isBig;

    // const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    // const ref = useRef();

    // const toggleOptions = (event: MouseEvent) => {
    //     event.stopPropagation();
    //     setAreOptionsOpen((prev) => !prev);
    // };

    // const closeOptions = () => {
    //     setAreOptionsOpen(false);
    // };

    // const slideOperationsOptions: IOptionSlideOperations[] = [
    //     { key: "add", label: "Создать", method: createSlide },
    //     { key: "duplicate", label: "Дублировать", method: duplicateSlide },
    //     { key: "remove", label: "Удалить", method: removeSlide },
    //     { key: "templates", label: "Макеты" },
    // ];

    // useOutsideClick(
    //     ref,
    //     closeOptions,
    //     {isCancelled: !areOptionsOpen},
    // )

    // useEffect(() => {
    //     if (!areOptionsOpen) return;

    //     const closeOutside = (event) => {
    //         if (event.target === ref.current) {
    //             closeOptions();
    //         }
    //     };

    //     document.addEventListener("click", closeOutside);

    //     return () => document.removeEventListener("click", closeOutside);
    // }, []);

    // return (
    //     <div
    //         className={clsx(s.root, {
    //         [s.big]: type === "big",
    //         [s.small]: type === "small",
    //     })}
    //         ref={ref}
    //     >
    //         {isSmall &&
    //             <div className={s.paranja} ref={ref}/>
    //         }

    //         {/* На время разработки */}
    //         <p>{id.slice(0, 5)}</p>

    //         {isSmall &&
    //             // TODO: Найти SVG-иконку три точки
    //             <p
    //                 className={s.settings}
    //                 style={{ fontSize: 20 }}
    //                 onClick={toggleOptions}
    //             >
    //                 ...
    //             </p>
    //         }

    //         {areOptionsOpen && isSmall &&
    //             <div ref={ref}>
    //                 <SlideOperations
    //                     options={slideOperationsOptions}
    //                     id={id}
    //                     onClose={closeOptions}
    //                 />
    //             </div>
    //         }

    //         <SlideEditor />

    //         {isBig &&
    //             <p className={s.page}>{(index ?? 0) + 1}</p>
    //         }
    //     </div>
    // );
};
