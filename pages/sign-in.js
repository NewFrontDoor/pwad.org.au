import React from 'react';
import PropType from 'prop-types';
import Text from 'mineral-ui/Text';

import redirect, {buildUrl} from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';
import Link from '../components/link';
import {SignInForm} from '../components/account';

function Signin({redirectPath}) {
  return (
    <PageLayout>
      <SignInForm redirectPath={redirectPath} />
      <Text>
        New? <Link href="/create-account">Create account</Link>
      </Text>
    </PageLayout>
  );
}

Signin.getInitialProps = async function(ctx) {
  const {loggedInUser} = await checkLoggedIn(ctx.apolloClient);

  if (loggedInUser.user) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(ctx, '/');
  }

  const url = buildUrl(ctx.req);

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
