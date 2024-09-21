import clsx from "clsx";

import { TAB } from "@/context/appContext";
import { useAppContext } from "@/hooks/useAppContext";
import { useAppActionsContext } from "@/hooks/useAppActionsContext";

import * as s from "./styled.module.scss";

export function Header() {
    const { activeTab } = useAppContext();
    const { setActiveTab } = useAppActionsContext();

    return (
        <nav className={s.root}>
            <ul className={s.tabs}>
                {Object.keys(TAB).map((key) => (
                    <li
                        className={clsx(s.tab, {
                            [s.tab_active]: key === activeTab,
                        })}
                        key={key}
                        onClick={() => setActiveTab(key as TAB)}
                    >
                        {TAB[key as keyof typeof TAB]}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
