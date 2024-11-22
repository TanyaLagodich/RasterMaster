import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
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
    isNumerationShown: boolean;
};

type AppActionsContextType = {
    setActiveTab: (tab: TAB) => void;
    setActiveTabDropdown: (tab: TAB | undefined) => void;
    setMode: (mode: AppMode) => void;
    toggleNumeration: () => void;
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
    const [isNumerationShown, setIsNumerationShown] = useState(false);

    const toggleNumeration = useCallback(() => {
        setIsNumerationShown(prev => !prev);
    }, []);

    const values = useMemo(
        () => ({ activeTab, activeTabDropdown, mode, isNumerationShown }),
        [activeTab, activeTabDropdown, mode, isNumerationShown]
    );

    const actions = useMemo(
        () => ({
            setActiveTab,
            setActiveTabDropdown,
            setMode,
            toggleNumeration,
        }),
        [setActiveTab, setActiveTabDropdown, setMode, toggleNumeration]
    );

    return (
        <AppContext.Provider value={values}>
            <AppActionsContext.Provider value={actions}>
                {children}
            </AppActionsContext.Provider>
        </AppContext.Provider>
    );
};
