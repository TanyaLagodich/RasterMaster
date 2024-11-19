import { Header } from '@/components/header';
import ToolsHeader from '@/components/header/tools-header';
import Sidebar from '@/components/sidebar';
import Notes from '@/components/notes';
import { Slide } from '@/components/slide/slide';
import * as s from './styled.module.scss';
import { useState } from "react";
import { SlideShow } from '@/components/slide-show';

enum AppModes {
    EDITOR = 'EDITOR',
    SLIDESHOW = 'SLIDESHOW',
}

export function App() {
    const [mode, setMode] = useState<AppModes>(AppModes.EDITOR);

    return (
        <>
            {mode === AppModes.SLIDESHOW && <SlideShow onExit={() => setMode(AppModes.EDITOR)} />}
            <Header onOenSlideShow={() => setMode(AppModes.SLIDESHOW)} />

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
