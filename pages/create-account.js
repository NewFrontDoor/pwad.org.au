import React from 'react';
import styled from 'react-emotion';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

import Link from '../components/link';
import NavBar from '../components/nav-bar/nav-bar';
import {CreateAccountForm} from '../components/account';

const Footer = styled('footer')`
  padding: 15vh 1rem;
`;

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
        <NavBar onMenuClick={this.handleMenuClick} />
        <Box width={3 / 4} marginVertical={0} marginHorizontal="auto">
          <CreateAccountForm />
          <Text>
            Already have an account?{' '}
            <Link prefetch href="/sign-in">
              Sign in
            </Link>
          </Text>
        </Box>
        <Footer>
          <hr />
          <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
        </Footer>
      </>
    );
  }
}
