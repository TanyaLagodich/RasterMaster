import { createContext, ReactNode, useMemo, useState } from 'react';
import { AppMode } from '@/types';

export enum TAB {
    FILE = 'Файл',
    INSERTION = 'Вставка',
    DECORATION = 'Оформление',
    ANIMATION = 'Анимации',
}

type AppContextType = {
    activeTab: TAB;
    activeTabDropdown?: TAB;
    mode: AppMode;
};

type AppActionsContextType = {
    setActiveTab: (tab: TAB) => void;
    setActiveTabDropdown: (tab: TAB | undefined) => void;
    setMode: (mode: AppMode) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
export const AppActionsContext = createContext<AppActionsContextType | null>(
    null
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState(TAB.DECORATION);
    const [activeTabDropdown, setActiveTabDropdown] = useState<TAB | undefined>(
        undefined
    );

    const [mode, setMode] = useState(AppMode.EDITOR);

    const values = useMemo(
        () => ({ activeTab, activeTabDropdown, mode }),
        [activeTab, activeTabDropdown, mode]
    );

    const actions = useMemo(
        () => ({
            setActiveTab,
            setActiveTabDropdown,
            setMode,
        }),
        [setActiveTab, setActiveTabDropdown, setMode]
    );

    return (
        <AppContext.Provider value={values}>
            <AppActionsContext.Provider value={actions}>
                {children}
            </AppActionsContext.Provider>
        </AppContext.Provider>
    );
};
