import { useContext } from 'react';
import { SlideMediatorContext } from '@/context/slideMediator';
import type { SlideMediatorContextType } from '@/types';

export const useSlideMediator = (): SlideMediatorContextType => {
  const context = useContext(SlideMediatorContext);
   if (!context) {
       throw new Error('useSlideMediator must be used within a SlideMediatorProvider');
   }
   return context;
}