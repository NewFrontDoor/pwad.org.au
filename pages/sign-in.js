import React from 'react';
import PropType from 'prop-types';
import Text from 'mineral-ui/Text';

import redirect, {buildUrl} from '../lib/redirect';
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

    const url = buildUrl(ctx.req);

    return {
      redirectPath: url.searchParams.get('r')
    };
  }

  static propTypes = {
    redirectPath: PropType.string
  };

  static defaultProps = {
    redirectPath: undefined
  };

  render() {
    const {redirectPath} = this.props;
    return (
      <>
        <SignInForm redirectPath={redirectPath} />
        <Text>
          New? <Link href="/create-account">Create account</Link>
        </Text>
      </>
    );
  }
}

export default Signin;
