import { Header } from "@/components/header";
import { ToolsHeader } from "@/components/tools-header";
import { Sidebar } from "@/components/sidebar";
import { Slide } from "@/components/slide";
import { Notes } from "@/components/notes";

import * as s from "./styled.module.scss";

export function Layout() {
    return (
        <>
            <Header />

            <ToolsHeader />

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
