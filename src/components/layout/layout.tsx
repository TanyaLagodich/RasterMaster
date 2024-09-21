import { Header } from "@/components/header";

import * as s from "./styled.module.scss";

export function Layout() {
    return (
        <div>
            <Header />

            <div className={s.subHeader}></div>

            <div className={s.body}>
                <div className={s.sidebar}></div>
                <div className={s.content}>hello</div>
            </div>
        </div>
    );
}
