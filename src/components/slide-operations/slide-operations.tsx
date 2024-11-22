import { ISetting } from '@/types';
import { FC, MouseEvent, useMemo } from 'react';
import { Template } from '@/types';
import { useSlideMediator } from '@/hooks/useSlideMediatorContext';
import * as s from './styled.module.scss';

interface IProps {
    options: ISetting[],
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
            ))}
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
                <>
                    <ul className={s.templatesList}>
                        {Object.entries(templatesDict).map(([template, name]) => (
                            <li key={template} onClick={() => setTemplate(template as Template)}>
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button onClick={onSelectTemplate}>Создать</button>
                </>
            } */}
         </div>
    )
}

export default SlideOperations;