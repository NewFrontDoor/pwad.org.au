import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';

import PageLayout from '../components/page-layout';
import Logo from '../components/logo';
import ManageAccountForm from '../components/account/manage-account-form';
import redirect, {buildUrl} from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo from '../lib/with-apollo-client';

import {ME} from '../components/queries';

function MyAccount() {
  const {data: {me} = {}} = useQuery(ME);
  const {hasPaidAccount, hasFreeAccount, name} = me || {};

  return (
    <PageLayout>
      <Flex marginBottom="md">
        <FlexItem width="75px">
          <Logo />
        </FlexItem>
        <FlexItem>
          <Text as="h1">Public Worship and Aids to Devotion</Text>
          <Text as="h2">My Account</Text>
        </FlexItem>
      </Flex>
      {me &&
        (hasPaidAccount || hasFreeAccount ? (
          <>
            <Text appearance="h1">Welcome back {name.first}!</Text>
            <ManageAccountForm {...me} />
          </>
        ) : (
          <>
            <Text appearance="h1">
              Welcome {name.first}, lets get you set up!
            </Text>
            <Text appearance="h2">
              Which type of account would you like to create?
            </Text>
            <ManageAccountForm {...me} />
          </>
        ))}
    </PageLayout>
  );
}

MyAccount.getInitialProps = async function(context) {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    return {};
  }

  const currentURL = buildUrl(context.req);
  const url = new URL('/sign-in', currentURL);

  url.searchParams.set('r', currentURL);

  redirect(context, url);
};

export default withApollo(MyAccount);
