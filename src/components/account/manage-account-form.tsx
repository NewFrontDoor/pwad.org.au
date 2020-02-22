import React, {FC, ReactNode, useCallback} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import PropTypes from 'prop-types';
import {Styled, Box, Grid, Text} from 'theme-ui';
import {Check} from 'react-feather';
import {string, object} from 'yup';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import Button from '../button';
import {useStripe, StripeProvider, Elements} from '../use-stripe';
import {
  useChangePasswordMutation,
  StripeCheckoutSessionDocument,
  StripeCheckoutSessionMutation,
  useChangeFreeAccountMutation,
  MeDocument,
  User
} from '../queries';

const validationSchema = object().shape({
  newPassword: string()
    .label('New password')
    .required()
});

type AccountPaymentButton = {
  children: ReactNode;
  hasPaidAccount: boolean;
};

const AccountPaymentButton: FC<AccountPaymentButton> = ({
  children,
  hasPaidAccount
}) => {
  const {stripe} = useStripe();
  const client = useApolloClient();

  const handleAccountPayment = useCallback(async () => {
    const {data} = await client.mutate<StripeCheckoutSessionMutation>({
      mutation: StripeCheckoutSessionDocument
    });

    const {sessionId} = data.stripeCheckoutSession;

    stripe.redirectToCheckout({
      sessionId
    });
  }, [client, stripe]);

  return (
    <Button
      isPrimary
      isFullWidth
      size="jumbo"
      iconStart={hasPaidAccount ? <Check role="img" /> : undefined}
      disabled={hasPaidAccount}
      onClick={handleAccountPayment}
    >
      {children}
    </Button>
  );
};

AccountPaymentButton.propTypes = {
  hasPaidAccount: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
};

const ManageForm: FC<User> = ({hasFreeAccount, hasPaidAccount}) => {
  const freeAccount = hasFreeAccount && !hasPaidAccount;

  const [changeFreeAccount] = useChangeFreeAccountMutation({
    update(cache, {data}) {
      const {changeFreeAccount} = data;
      const {me} = cache.readQuery({query: MeDocument});
      cache.writeQuery({
        query: MeDocument,
        data: {
          me: {
            ...me,
            hasFreeAccount: changeFreeAccount.hasFreeAccount
          }
        }
      });
    }
  });

  const [changePassword] = useChangePasswordMutation();

  function handleChangeFreeAccount(): void {
    changeFreeAccount({
      variables: {hasFreeAccount: true},
      optimisticResponse: {
        __typename: 'Mutation',
        changeFreeAccount: {
          __typename: 'User',
          hasFreeAccount: true
        }
      }
    });
  }

  async function handleChangePassword(): Promise<void> {
    const {data} = await changePassword();

    window.location.assign(data.changePassword.ticket);
  }

  return (
    <Grid columns={[1, 2]} gap={[3, 5]}>
      <Box sx={{width: '100%'}}>
        <Grid columns={[1, 2]} gap={[3, 5]}>
          <Box sx={{width: '100%'}}>
            <Button
              isFullWidth
              iconStart={freeAccount ? <Check role="img" /> : undefined}
              disabled={hasFreeAccount || hasPaidAccount}
              size="jumbo"
              onClick={handleChangeFreeAccount}
            >
              Liturgy only
            </Button>
            <Styled.p variant="prose">this option is free to use</Styled.p>
          </Box>
          <Box sx={{width: '100%'}}>
            <AccountPaymentButton hasPaidAccount={hasPaidAccount}>
              Liturgy and Music
            </AccountPaymentButton>
            <Styled.p variant="prose">
              this option is an Annual Subscription of $12 per year
            </Styled.p>
          </Box>
        </Grid>

        <Button onClick={handleChangePassword}>Change Password</Button>
      </Box>
      <Box sx={{width: '100%'}}>
        <Text as="h3">
          What is included in the Liturgy and Music account option?
        </Text>
        <Styled.p variant="prose" as="ul">
          <li>Search Capabilities</li>
          <li>PowerPoint Slides</li>
          <li>Sound Bites</li>
          <li>Music Scores</li>
          <li>Alternate Tunes</li>
          <li>Author Index</li>
          <li>Topical Index</li>
          <li>Metre Index</li>
          <li>Occasion Index</li>
          <li>Year Index</li>
        </Styled.p>
      </Box>
    </Grid>
  );
};

ManageForm.propTypes = {
  hasFreeAccount: PropTypes.bool.isRequired,
  hasPaidAccount: PropTypes.bool.isRequired
};

const ManageFormProvider: FC<User> = props => (
  <StripeProvider>
    <Elements>
      <ManageForm {...props} />
    </Elements>
  </StripeProvider>
);

export default ManageFormProvider;
