import React, { ReactNode } from 'react';
import clsx from 'clsx';
import * as s from './base-node.module.scss';

type BaseNodeProps = {
    style: React.CSSProperties;
    isSelected: boolean;
    onClick?: () => void;
    children: ReactNode;
};

export function BaseNode({ style, isSelected, onClick, children }: BaseNodeProps) {
    return (
        <div
            className={clsx(s.root, { [s.selected]: isSelected })}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
