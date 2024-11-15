import { Space } from 'antd';
import { Header } from "@/components/header";
import ToolsHeader from "@/components/header/tools-header";
import Sidebar from "@/components/sidebar";
import { Slide } from '@/components/slide';
import Notes from "@/components/notes";

import * as s from "./styled.module.scss";
import { useCallback } from "react";


export function Layout() {
    const editSlide = useCallback((id: string) => {

    }, [])

    // Handlers for grag'n'drop
    const touchSlide = useCallback(() => {}, [])
    const moveSlide = useCallback(() => {}, [])
    const untouchSlide = useCallback(() => {}, [])

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
