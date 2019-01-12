import React from 'react';
import Text from 'mineral-ui/Text';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

import Link from '../components/link';
import {CreateAccountForm} from '../components/account';

export default class CreateAccount extends React.Component {
  static async getInitialProps(context) {
    const {loggedInUser} = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }

  render() {
    return (
      <>
        <CreateAccountForm />
        <Text>
          Already have an account?{' '}
          <Link prefetch href="/sign-in">
            Sign in
          </Link>
        </Text>
      </>
    );
  }
}
