import { FC, Component } from 'react';
import * as s from './styled.module.scss';

interface IProps extends HTMLParagraphElement {
    type?: 'ordinary' | 'header';
}

const Text: FC<IProps> = ({type = 'ordinary'}, children) => {
    return (
        <Component>
            <p className={type === 'header' ? s.heading : s.text}>
                {children}
            </p>
        </Component>
    )
}

export default Text;
