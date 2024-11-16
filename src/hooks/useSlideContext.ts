import { useContext } from 'react';
import { SlideContext } from '../context/slideContext';

export const useSlideContext = () => {
    const slideContext = useContext(SlideContext);

    if (!slideContext) {
        throw new Error(
            'useSlideContext must be used within a SlideContextProvider'
        );
    }

    return slideContext;
};
