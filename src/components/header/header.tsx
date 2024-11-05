import { Button, Dropdown } from "antd";

import { TAB } from "@/context/appContext";
import { useAppActionsContext } from "@/hooks/useAppActionsContext";
import { useSlideActionsContext } from "@/hooks/useSlideActionsContext";

import * as s from "./styled.module.scss";

export function Header() {
    const { setActiveTab } = useAppActionsContext();
    const { addText } = useSlideActionsContext();

    return (
        <nav className={s.root}>
            <ul className={s.tabs}>
                <Dropdown
                    menu={{ items: [{ key: "smth", label: "Smth" }] }}
                    placement="bottomLeft"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button>{TAB.FILE}</Button>
                </Dropdown>

                <Dropdown
                    menu={{
                        items: [
                            {
                                key: "text",
                                label: "Текст",
                                onClick: addText,
                            },
                        ],
                    }}
                    placement="bottomLeft"
                    arrow={{ pointAtCenter: true }}
                >
                    <Button>{TAB.INSERTION}</Button>
                </Dropdown>

                {Object.keys(TAB)
                    .slice(2)
                    .map((tab: keyof typeof TAB) => (
                        <Button
                            onClick={() => setActiveTab(TAB[tab])}
                            key={tab}
                        >
                            {TAB[tab]}
                        </Button>
                    ))}
            </ul>
        </nav>
    );
}
