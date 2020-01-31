import React, {FC, ReactNode, useCallback} from 'react';
import PropTypes from 'prop-types';
import {Styled, Box, Flex, Text} from 'theme-ui';
import {Check} from 'react-feather';
import {string, object} from 'yup';
import {Formik, Form} from 'formik';
import {TextField} from '../form';
import Button from '../button';
import {useStripe, StripeProvider, Elements} from '../use-stripe';

import {
  useChangePasswordMutation,
  useChangeFreeAccountMutation,
  useMeQuery,
  MeDocument
} from '../queries';

const validationSchema = object().shape({
  password: string()
    .label('Password')
    .required(),
  newPassword: string()
    .label('New password')
    .required(),
  confirmPassword: string()
    .label('Confirm password')
    .required()
});

function handleChangeFreeAccount(changeFreeAccount) {
  return () =>
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

function handleChangePassword(changePassword) {
  return ({password, newPassword, confirmPassword}) => {
    changePassword({
      variables: {
        password,
        newPassword,
        confirmPassword
      }
    });
  };
}

type AccountPaymentButton = {
  children: ReactNode;
  hasPaidAccount: boolean;
};

const AccountPaymentButton: FC<AccountPaymentButton> = ({
  children,
  hasPaidAccount
}) => {
  const {stripe} = useStripe();
  const {data} = useMeQuery();

  const handleAccountPayment = useCallback(async () => {
    const successUrl = new URL(
      '/api/callback/payment-success',
      window.location.href
    );
    const cancelUrl = new URL('/my-account', window.location.href);

    const session = await stripe.redirectToCheckout({
      items: [{sku: 'sku_GBZZqHosJSdAkX', quantity: 1}],
      successUrl: successUrl.href,
      cancelUrl: cancelUrl.href,
      customerEmail: data.me.email
    });

    console.log(session);
  }, [data.me.email, stripe]);

  return (
    <Button
      primary
      fullWidth
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

type ManageFormProps = {
  hasFreeAccount?: boolean;
  hasPaidAccount?: boolean;
};

const ManageForm: FC<ManageFormProps> = ({hasFreeAccount, hasPaidAccount}) => {
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

  return (
    <Flex
      gutterWidth="xxl"
      sx={{
        flexDirection: ['column-reverse', 'row-reverse']
      }}
    >
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
      <Box sx={{width: '100%'}}>
        <Flex
          sx={{
            flexDirection: ['column-reverse', 'row']
          }}
        >
          <Box sx={{width: '100%'}}>
            <Button
              fullWidth
              iconStart={freeAccount ? <Check role="img" /> : undefined}
              disabled={hasFreeAccount || hasPaidAccount}
              size="jumbo"
              onClick={handleChangeFreeAccount(changeFreeAccount)}
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
              this option has a once off $30 fee
            </Styled.p>
          </Box>
        </Flex>

        <Formik
          validationSchema={validationSchema}
          initialValues={{
            password: '',
            newPassword: '',
            confirmPassword: ''
          }}
          onSubmit={handleChangePassword(changePassword)}
        >
          <Form>
            <Box marginBottom={3}>
              <TextField
                required
                type="password"
                label="Old password"
                name="password"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                required
                type="password"
                label="New password"
                name="newPassword"
              />
            </Box>
            <Box marginBottom={3}>
              <TextField
                required
                type="password"
                label="Confirm password"
                name="confirmPassword"
              />
            </Box>
            <Box marginBottom={3}>
              <Button type="submit">Change Password</Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

ManageForm.propTypes = {
  hasFreeAccount: PropTypes.bool.isRequired,
  hasPaidAccount: PropTypes.bool.isRequired
};

const ManageFormProvider: FC<ManageFormProps> = props => (
  <StripeProvider>
    <Elements>
      <ManageForm {...props} />
    </Elements>
  </StripeProvider>
);

export default ManageFormProvider;
