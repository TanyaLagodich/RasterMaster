import { createRoot } from 'react-dom/client';
import { AppContextProvider } from './context/appContext';
import { SlideContextProvider } from '@/context/slideContext';
import { SlideMediatorProvider } from '@/context/slideMediator';
import './index.scss';
import { App } from '@/components/app';

createRoot(document.getElementById('root')!).render(
    <AppContextProvider>
        <SlideMediatorProvider>
            <SlideContextProvider>
                <App />
            </SlideContextProvider>
        </SlideMediatorProvider>
    </AppContextProvider>
);
