import React, {useCallback} from 'react';
import {useApolloClient} from '@apollo/client';
import PropTypes from 'prop-types';
import {Styled, Box, Grid, Text, Select, Label} from 'theme-ui';
import {Check} from 'react-feather';
import startCase from 'lodash/startCase';
import Button from '../button';
import Loading from '../loading';
import {loadStripe} from '@stripe/stripe-js';
import {Elements, useStripe} from '@stripe/react-stripe-js';
import {useForm} from 'react-hook-form';
import {
  MeDocument,
  CurrentSubscriptionDocument,
  StripeCheckoutSessionDocument,
  StripeCheckoutSessionMutation,
  useCancelSubscriptionMutation,
  useChangeFreeAccountMutation,
  useChangePasswordMutation,
  useCurrentSubscriptionQuery,
  useUpdatePresentationOptionsMutation,
  User,
  StripeSubscription,
  PresentationOptions
} from '../queries';

const CancelSubscriptionButton = () => {
  const [cancelSubscription] = useCancelSubscriptionMutation({
    update(cache, {data}) {
      cache.writeQuery({
        query: CurrentSubscriptionDocument,
        data: {
          subscription: data.cancelSubscription
        }
      });
    }
  });

  async function handleCancelSubscription(): Promise<void> {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to cancel your subscription')) {
      await cancelSubscription();
    }
  }

  return (
    <Button
      isPrimary
      isFullWidth
      size="jumbo"
      onClick={handleCancelSubscription}
    >
      Cancel Subscription
    </Button>
  );
};

type AccountPaymentButtonProps = {
  children: React.ReactNode;
};

const AccountPaymentButton = ({children}: AccountPaymentButtonProps) => {
  const stripe = useStripe();
  const client = useApolloClient();

  const handleAccountPayment = useCallback(async () => {
    const {data} = await client.mutate<StripeCheckoutSessionMutation>({
      mutation: StripeCheckoutSessionDocument
    });

    const {sessionId} = data.stripeCheckoutSession;

    void stripe.redirectToCheckout({
      sessionId
    });
  }, [client, stripe]);

  return (
    <Button isPrimary isFullWidth size="jumbo" onClick={handleAccountPayment}>
      {children}
    </Button>
  );
};

AccountPaymentButton.propTypes = {
  children: PropTypes.node.isRequired
};

type BuySubscriptionProps = {
  hasFreeAccount: boolean;
  changeFreeAccount: () => void;
};

const BuySubscription = ({
  hasFreeAccount,
  changeFreeAccount
}: BuySubscriptionProps) => {
  return (
    <>
      <Box sx={{width: '100%'}} marginBottom={3}>
        <Button
          isFullWidth
          iconStart={hasFreeAccount ? <Check role="img" /> : undefined}
          disabled={hasFreeAccount}
          size="jumbo"
          onClick={changeFreeAccount}
        >
          Liturgy only
        </Button>
        <Styled.p variant="prose">this option is free to use</Styled.p>
      </Box>
      <Box sx={{width: '100%'}}>
        <AccountPaymentButton>Liturgy and Music</AccountPaymentButton>
        <Styled.p variant="prose">
          this option is an Annual Subscription of $12 per year
        </Styled.p>
      </Box>
    </>
  );
};

BuySubscription.propTypes = {
  hasFreeAccount: PropTypes.bool.isRequired,
  changeFreeAccount: PropTypes.func.isRequired
};

const PresentationOptionsForm = ({
  font,
  background,
  ratio
}: PresentationOptions) => {
  const [updateOptions] = useUpdatePresentationOptionsMutation();
  const {register, handleSubmit} = useForm({
    defaultValues: {
      font,
      background,
      ratio
    }
  });
  const onSubmit = handleSubmit((data) =>
    updateOptions({
      variables: {
        input: data
      }
    })
  );

  return (
    <>
      <Box as="form" sx={{width: '100%'}} onSubmit={onSubmit}>
        <Text as="h3">Presentation options:</Text>
        <Label htmlFor="font">Font</Label>
        <Select ref={register} defaultValue="arial" name="font">
          <option value="arial">Arial</option>
          <option value="helvetica">Helvetica</option>
          <option value="arounded">Arial Rounded</option>
        </Select>
        <Label htmlFor="colourScheme">Background/colour scheme</Label>
        <Select ref={register} defaultValue="PCA" name="background">
          <option value="pca">PCA</option>
          <option value="white">White</option>
          <option value="beige">Beige</option>
          <option value="black">Black</option>
        </Select>
        <Label htmlFor="aspectRatio">Aspect Ratio</Label>
        <Select ref={register} defaultValue="169" name="ratio">
          <option value="LAYOUT_16x9">16:9</option>
          <option value="LAYOUT_16x10">16:10</option>
          <option value="LAYOUT_4x3">4:3</option>
        </Select>
        <Button type="submit">Save</Button>
      </Box>
    </>
  );
};

PresentationOptionsForm.propTypes = {
  font: PropTypes.string,
  background: PropTypes.string,
  ratio: PropTypes.string
};

const SubscriptionDetails = ({
  status,
  plan,
  currentPeriodEnd,
  canceledAt,
  cancelAt
}: StripeSubscription) => {
  const canceled = status === 'canceled' || canceledAt !== null;
  const active = !canceled;

  return (
    <Box sx={{width: '100%'}} marginBottom={3}>
      <Text as="h3">Current Subscription</Text>
      <p>{plan}</p>

      <dl>
        <dt>Subscription status:</dt>
        <dd>{startCase(status)}</dd>

        {active && (
          <>
            <dt>Your Subscription will automatically renew on:</dt>
            <dd>{new Date(currentPeriodEnd).toLocaleDateString()}</dd>
          </>
        )}

        {canceled && (
          <>
            <dt>Your Subscription was canceled on:</dt>
            <dd>{new Date(canceledAt).toLocaleDateString()}</dd>

            <dt>You will no longer be charged for this service.</dt>
            <dt>Your current service will end on:</dt>
            <dd>{new Date(cancelAt).toLocaleDateString()}</dd>
          </>
        )}
      </dl>

      {active && <CancelSubscriptionButton />}
    </Box>
  );
};

SubscriptionDetails.propTypes = {
  status: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  currentPeriodEnd: PropTypes.any,
  canceledAt: PropTypes.any,
  cancelAt: PropTypes.any
};

const ManageForm = ({
  hasFreeAccount,
  hasPaidAccount,
  presentationOptions
}: User) => {
  const isFreeAccount = hasFreeAccount || !hasPaidAccount;

  const {data, loading} = useCurrentSubscriptionQuery();

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
    void changeFreeAccount({
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
        {loading ? (
          <Loading />
        ) : data?.subscription ? (
          <SubscriptionDetails {...data.subscription} />
        ) : (
          <Grid columns={[1, 2]} gap={[3, 5]}>
            <BuySubscription
              changeFreeAccount={handleChangeFreeAccount}
              hasFreeAccount={isFreeAccount}
            />
          </Grid>
        )}

        <Grid columns={[1, 2]} gap={[3, 5]}>
          <PresentationOptionsForm {...presentationOptions} />
          <Box>
            <Button
              isPrimary
              isFullWidth
              size="jumbo"
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Box>
        </Grid>
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
  hasFreeAccount: PropTypes.bool,
  hasPaidAccount: PropTypes.bool,
  presentationOptions: PropTypes.shape({
    font: PropTypes.string,
    background: PropTypes.string,
    ratio: PropTypes.string
  })
};

ManageForm.defaultProps = {
  hasFreeAccount: false,
  hasPaidAccount: false,
  presentationOptions: {
    font: 'arial',
    background: 'pca',
    ratio: 'LAYOUT_16x9'
  }
};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_CLIENT_TOKEN);

const ManageFormProvider = (props: User) => (
  <Elements stripe={stripePromise}>
    <ManageForm {...props} />
  </Elements>
);

export default ManageFormProvider;
