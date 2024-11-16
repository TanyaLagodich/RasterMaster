import { RefObject, useEffect } from "react";

export const useOutsideClick = (
    ref: RefObject<HTMLElement | null>,
    callback: () => void,
    options?: {isCancelled: boolean},
) => {
    useEffect(() => {
        const handler: EventListener = (event) => {
            if (options?.isCancelled || !ref) {
                return;
            }

            const {current} = ref;
    
            if (current && !current.contains(event.target as HTMLElement)) {
                console.log('Outside');
                
                callback();
            }
        };
  
        document.addEventListener('click', handler);

        return () => document.removeEventListener('click', handler);
    }, [ref, options]);
};
  