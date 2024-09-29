import { createContext, ReactNode, useMemo, useState } from "react";

export enum TAB {
    FILE = "Файл",
    INSERTION = "Вставка",
    DECORATION = "Оформление",
    SLIDESHOW = "Слайд-шоу",
    ANIMATION = "Анимации",
}

type AppContextType = {
    activeTab: TAB;
    activeTabDropdown?: TAB;
};

type AppActionsContextType = {
    setActiveTab: (tab: TAB) => void;
    setActiveTabDropdown: (tab: TAB | undefined) => void;
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

    const values = useMemo(
        () => ({ activeTab, activeTabDropdown }),
        [activeTab, activeTabDropdown]
    );

    const actions = useMemo(
        () => ({
            setActiveTab,
            setActiveTabDropdown,
        }),
        [setActiveTab, setActiveTabDropdown]
    );

    return (
        <AppContext.Provider value={values}>
            <AppActionsContext.Provider value={actions}>
                {children}
            </AppActionsContext.Provider>
        </AppContext.Provider>
    );
};
