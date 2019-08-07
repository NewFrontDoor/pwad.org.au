import React from 'react';
import {Query} from 'react-apollo';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';

import Logo from '../components/logo';
import ManageAccountForm from '../components/account/manage-account-form';
import redirect, {buildUrl} from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

import {ME} from '../components/queries';

export default class MyAccount extends React.Component {
  static async getInitialProps(ctx) {
    const {loggedInUser} = await checkLoggedIn(ctx.apolloClient);

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      return {};
    }

    const currentURL = buildUrl(ctx.req);
    const url = new URL('/sign-in', currentURL);

    url.searchParams.set('r', currentURL);

    redirect(ctx, url);
  }

  render() {
    return (
      <>
        <Flex marginBottom="md">
          <FlexItem width="75px">
            <Logo />
          </FlexItem>
          <FlexItem>
            <Text as="h1">Public Worship and Aids to Devotion</Text>
            <Text as="h2">My Account</Text>
          </FlexItem>
        </Flex>
        <Query query={ME}>
          {({data}) => {
            if (data.me) {
              const {hasPaidAccount, hasFreeAccount, name} = data.me;
              if (hasPaidAccount || hasFreeAccount) {
                return (
                  <>
                    <Text appearance="h1">Welcome back {name.first}!</Text>
                    <ManageAccountForm {...data.me} />
                  </>
                );
              }

              return (
                <>
                  <Text appearance="h1">
                    Welcome {name.first}, lets get you set up!
                  </Text>
                  <Text appearance="h2">
                    Which type of account would you like to create?
                  </Text>
                  <ManageAccountForm {...data.me} />
                </>
              );
            }

            return null;
          }}
        </Query>
      </>
    );
  }
}
