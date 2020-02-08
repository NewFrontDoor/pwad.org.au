import React, {FC, createContext, useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StripeProvider as StripeProviderInner,
  injectStripe,
  Elements as ElementsInner,
  ReactStripeElements
} from 'react-stripe-elements';

export const StripeProvider: FC = ({children}) => {
  const [stripe, setStripe] = useState(null);

  const initializeStripe = (): void => {
    setStripe(window.Stripe(process.env.STRIPE_CLIENT_TOKEN));
  };

  useEffect(() => {
    if (window.Stripe) {
      initializeStripe();
    } else {
      // Otherwise wait for Stripe script to load
      document.querySelector('#stripe-js').addEventListener('load', () => {
        initializeStripe();
      });
    }
  }, []);

  return <StripeProviderInner stripe={stripe}>{children}</StripeProviderInner>;
};

StripeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

type TStripeContext = {
  stripe?: ReactStripeElements.StripeProps;
  elements?: stripe.elements.Elements;
};

const StripeContext = createContext<TStripeContext>({});
const HookProvider = injectStripe(({stripe, elements, children}) => {
  return (
    <StripeContext.Provider value={{stripe, elements}}>
      {children}
    </StripeContext.Provider>
  );
});

export const Elements: FC = ({children}) => {
  return (
    <ElementsInner>
      <HookProvider>{children}</HookProvider>
    </ElementsInner>
  );
};

Elements.propTypes = {
  children: PropTypes.node.isRequired
};

export const useStripe = (): TStripeContext => useContext(StripeContext);
