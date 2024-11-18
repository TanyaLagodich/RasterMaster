import { IOptionSlideOperations } from '@/types';
import { FC, MouseEvent, useMemo, useState } from 'react';
import OperationItem from '../slide-operation/slide-operation';
import { templatesDict } from '@/entities/templates/utils';
import { Template } from '@/entities/templates/types';
import * as s from './styled.module.scss';

interface IProps {
    options?: IOptionSlideOperations[],
    id: string;
    onClose: () => void;
    areTemplatesShown?: boolean;
    createSlide: (id: string, template: Template) => void;
}

const SlideOperations: FC<IProps> = ({options = [], id, onClose, areTemplatesShown, createSlide}) => {
    console.log('SlideOperations');
    
    const optionsList = useMemo(() => {
        return options.map(({key, label, method, close}) => (
            <OperationItem 
                key={key}
                method={method}
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
        <div className={s.root}>
            {optionsList}

            {areTemplatesShown &&
                <div style={{zIndex: 1001}}>
                    <ul>
                        {Object.entries(templatesDict).map(([template, name]) => (
                            <li key={template} onClick={() => setTemplate(template as Template)}>
                                {name}
                            </li>
                        ))}
                    </ul>

                    <button onClick={onSelectTemplate}>Создать</button>
                </div>
            }
         </div>
    )
}

export default SlideOperations;