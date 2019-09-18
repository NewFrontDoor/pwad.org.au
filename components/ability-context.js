import {createContext, useContext} from 'react';
import {createContextualCan} from '@casl/react';

export const AbilityContext = createContext();

export function useAbility() {
  return useContext(AbilityContext);
}

export const Can = createContextualCan(AbilityContext.Consumer);
