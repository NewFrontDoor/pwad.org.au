import React from 'react';
import {NextPage} from 'next';
import PropType from 'prop-types';
import {Text} from 'theme-ui';

import redirect, {buildUrl} from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo, {WithApolloPageContext} from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';
import Link from '../components/link';
import {SignInForm} from '../components/account';

type SigninProps = {
  redirectPath: string;
};

const Signin: NextPage<SigninProps> = ({redirectPath}) => {
  return (
    <PageLayout>
      <SignInForm redirectPath={redirectPath} />
      <Text>
        New? <Link href="/create-account">Create account</Link>
      </Text>
    </PageLayout>
  );
};

Signin.getInitialProps = async (context: WithApolloPageContext) => {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect('/', context);
  }

  const url = buildUrl(context.req);

  return {
    redirectPath: url.searchParams.get('r')
  };
};

Signin.propTypes = {
  redirectPath: PropType.string
};

Signin.defaultProps = {
  redirectPath: undefined
};

export default withApollo(Signin);
