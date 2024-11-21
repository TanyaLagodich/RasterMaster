import { Header } from '@/components/header';
import ToolsHeader from '@/components/header/tools-header';
import Sidebar from '@/components/sidebar';
import Notes from '@/components/notes';
import { Slide } from '@/components/slide/slide';
import * as s from './styled.module.scss';

export function App() {
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