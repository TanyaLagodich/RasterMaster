import { Header } from "@/components/header";
import { SubHeader } from "@/components/sub-header";
import { Sidebar } from "@/components/sidebar";
import { Slide } from "@/components/slide";
import { Notes } from "@/components/notes";

import * as s from "./styled.module.scss";

export function Layout() {
    return (
        <>
            <Header />

            <SubHeader />

            <div className={s.body}>
                <Sidebar />

                <div className={s.content}>
                    <Slide />

                    <Notes />
                </div>
            </div>
        </>
    );
}
