import React from 'react';
import Text from 'mineral-ui/Text';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

import Link from '../components/link';
import {SignInForm} from '../components/account';

class Signin extends React.Component {
  static async getInitialProps(ctx) {
    const {loggedInUser} = await checkLoggedIn(ctx.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(ctx, '/');
    }

    return {};
  }

  render() {
    return (
      <>
        <SignInForm />
        <Text>
          New?{' '}
          <Link prefetch href="/create-account">
            Create account
          </Link>
        </Text>
      </>
    );
  }
}

export default Signin;
