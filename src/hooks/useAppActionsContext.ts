import { useContext } from 'react';
import { AppActionsContext } from '../context/appContext';

export const useAppActionsContext = () => {
    const appActionsContext = useContext(AppActionsContext);

    if (!appActionsContext) {
        throw new Error(
            'useAppActionsContext must be used within an AppContextProvider'
        );
    }

    return appActionsContext;
};
