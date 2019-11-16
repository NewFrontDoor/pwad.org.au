import {createContext, useContext} from 'react';

export const StripeContext = createContext({stripe: {}});

export function useStripe() {
  return useContext(StripeContext);
}
