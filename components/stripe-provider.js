import React from 'react';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import {
  StripeProvider as OldStripeProvider,
  injectStripe,
  Elements
} from 'react-stripe-elements';
import {StripeContext} from '../lib/stripe';

const {publicRuntimeConfig} = getConfig();

function StripeHookInjectedProvider({stripe, stripeData, children}) {
  const updatedStripeData = {...stripeData, stripe};

  return (
    <StripeContext.Provider value={updatedStripeData}>
      {children}
    </StripeContext.Provider>
  );
}

StripeHookInjectedProvider.propTypes = {
  stripe: PropTypes.object.isRequired,
  stripeData: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

const StripeHookProvider = injectStripe(StripeHookInjectedProvider);

const stripe = new window.Stripe(publicRuntimeConfig.stripeClientToken);

export default function StripeProvider({children}) {
  const stripeData = {
    stripe: null // This must be set inside the injected component
  };

  return (
    <OldStripeProvider stripe={stripe}>
      <Elements>
        <StripeHookProvider stripeData={stripeData}>
          {children}
        </StripeHookProvider>
      </Elements>
    </OldStripeProvider>
  );
}

StripeProvider.propTypes = {
  children: PropTypes.node.isRequired
};
