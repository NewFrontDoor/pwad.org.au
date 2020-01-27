import React from 'react';
import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import {Text, Flex, Box, Styled} from 'theme-ui';

import PageLayout from '../components/page-layout';
import Logo from '../components/logo';
import redirect, {buildUrl} from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo, {WithApolloPageContext} from '../lib/with-apollo-client';

import {useMeQuery} from '../components/queries';

const ManageAccountForm = dynamic(
  async () => import('../components/account/manage-account-form'),
  {
    ssr: false
  }
);

const MyAccount: NextPage = () => {
  const {data} = useMeQuery();
  const {hasPaidAccount, hasFreeAccount, name} = data?.me ?? {};

  return (
    <PageLayout>
      <Flex marginBottom={3}>
        <Box width="75px">
          <Logo />
        </Box>
        <Box>
          <Text as="h1">Public Worship and Aids to Devotion</Text>
          <Text as="h2">My Account</Text>
        </Box>
      </Flex>
      {data.me &&
        (hasPaidAccount || hasFreeAccount ? (
          <>
            <Styled.p variant="h1">Welcome back {name.first}!</Styled.p>
            <ManageAccountForm {...data.me} />
          </>
        ) : (
          <>
            <Styled.p variant="h1">
              Welcome {name.first}, lets get you set up!
            </Styled.p>
            <Styled.p variant="h2">
              Which type of account would you like to create?
            </Styled.p>
            <ManageAccountForm {...data.me} />
          </>
        ))}
    </PageLayout>
  );
};

MyAccount.getInitialProps = async (context: WithApolloPageContext) => {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    return;
  }

  const currentURL = buildUrl(context.req);
  const url = new URL('/sign-in', currentURL);

  url.searchParams.set('r', currentURL.href);

  redirect(context, url);
};

export default withApollo(MyAccount);
