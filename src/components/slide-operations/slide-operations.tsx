import { FC, MouseEvent, useMemo, useState } from 'react';
import OperationItem from '../slide-operation/slide-operation';
import { templatesDict } from '@/entities/templates/utils';
import { ISetting, Template } from '@/types';
import * as s from './styled.module.scss';

interface IProps {
    options: ISetting[],
    id: string;
    onClose: () => void;
    areTemplatesShown: boolean;
    createSlide: (event: MouseEvent, id: string, template: Template) => void;
}

const SlideOperations: FC<IProps> = ({options, id, onClose, areTemplatesShown, createSlide}) => {
    const optionsList = useMemo(() => {
        return options.map(({key, label, onClick}) => (
            <OperationItem 
                key={key}
                method={onClick}
                onClose={onClose}
                className={s.option}
                label={label}
                id={id}
                close={!!close}
            />
        ))
    }, [options])

    const [template, setTemplate] = useState<Template | null>(null);

    const onSelectTemplate = (event) => {
        createSlide(event, id, template);
    }

    return (
        <ul className={s.root}>
            {optionsList}

            {areTemplatesShown &&
                <li style={{zIndex: 1001}}>
                    <ul>
                        {Object.entries(templatesDict).map(([template, name]) => (
                            <li key={template} onClick={() => setTemplate(template as Template)}>
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button onClick={onSelectTemplate}>Создать</button>
                </li>
            }
         </ul>
    )
}

export default SlideOperations;