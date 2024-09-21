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
};

type AppActionsContextType = {
    setActiveTab: (tab: TAB) => void;
};

export const AppContext = createContext<AppContextType | null>(null);
export const AppActionsContext = createContext<AppActionsContextType | null>(
    null
);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [activeTab, setActiveTab] = useState(TAB.FILE);

    const values = useMemo(() => ({ activeTab }), [activeTab]);

    const actions = useMemo(
        () => ({
            setActiveTab,
        }),
        [setActiveTab]
    );

    return (
        <AppContext.Provider value={values}>
            <AppActionsContext.Provider value={actions}>
                {children}
            </AppActionsContext.Provider>
        </AppContext.Provider>
    );
};
