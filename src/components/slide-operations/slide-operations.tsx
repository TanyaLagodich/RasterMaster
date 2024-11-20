import { IOptionSlideOperations } from '@/types';
import { FC, MouseEvent, useMemo, useState } from 'react';
import OperationItem from '../slide-operation/slide-operation';
import { templatesDict } from '@/entities/templates/utils';
import { Template } from '@/types';
import * as s from './styled.module.scss';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';

interface IProps {
    options: IOptionSlideOperations[],
    id: string;
    onClose: () => void;
    areTemplatesShown?: boolean;
    createSlide: (event: MouseEvent, id: string, template?: Template) => void;
}

const SlideOperations: FC<IProps> = ({options, id, areTemplatesShown, onClose}) => {    
    const optionsList = useMemo(() => (
        <ul className={s.root}>
            {options.map(({key, label, onClick}) => (
                <li
                    key={key}
                    onClick={onClick}
                    className={s.option}
                >
                    {label}
                </li>
                ))
            }
        </ul>
    ), [options])

    // const { mediator } = useSlideMediator();

    // const [template, setTemplate] = useState<Template | null>(null);

    // const onSelectTemplate = (event: MouseEvent) => {
    //     event.stopPropagation();
    //     if (template) {
    //         mediator.createSlide(event, id, template);
    //     }
    //     onClose();
    // }

    return (
        <div>
            {optionsList}

            {/* {areTemplatesShown &&
                <div className={s.templatesList}>
                    <ul>
                        {Object.entries(templatesDict).map(([template, name]) => (
                            <li key={template} onClick={() => setTemplate(template as Template)}>
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button onClick={onSelectTemplate}>Создать</button>
                </div>
            } */}
         </div>
    )
}

export default SlideOperations;