import { Header } from '@/components/header';
import ToolsHeader from '@/components/header/tools-header';
import Sidebar from '@/components/sidebar';
import Notes from '@/components/notes';
import { Slide } from '@/components/slide/slide';
import * as s from './styled.module.scss';
import { AppMode } from '@/types';
import { SlideShow } from '@/components/slide-show';
import { useAppContext } from '@/hooks/useAppContext';
import { useAppActionsContext } from '@/hooks/useAppActionsContext';

export function App() {
    const { mode } = useAppContext();
    const { setMode } = useAppActionsContext();

    return (
        <>
            {mode === AppMode.SLIDESHOW && <SlideShow onExit={() => setMode(AppMode.EDITOR)} />}
            <Header />

            <ToolsHeader />

            <div className={s.body}>
                <Sidebar />

                <div className={s.content}>
                    <div className={s.contentWrapper}>
                        <Slide />
                    </div>

                    {/*<Notes />*/}
                </div>
            </div>
        </>
    );
}
