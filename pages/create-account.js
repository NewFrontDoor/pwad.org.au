import React from 'react';
import Text from 'mineral-ui/Text';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';
import Link from '../components/link';
import {CreateAccountForm} from '../components/account';

function CreateAccount() {
  return (
    <PageLayout>
      <CreateAccountForm />
      <Text>
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </Text>
    </PageLayout>
  );
}

CreateAccount.getInitialProps = async function(context) {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect(context, '/');
  }

  return {};
};

export default withApollo(CreateAccount);
