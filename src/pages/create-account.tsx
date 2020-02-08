import React from 'react';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';

import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';
import withApollo, {WithApolloPageContext} from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';
import Link from '../components/link';
import {CreateAccountForm} from '../components/account';

const CreateAccount: NextPage = () => {
  return (
    <PageLayout>
      <CreateAccountForm />
      <Styled.p>
        Already have an account? <Link href="/sign-in">Sign in</Link>
      </Styled.p>
    </PageLayout>
  );
};

CreateAccount.getInitialProps = async (context: WithApolloPageContext) => {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    // Already signed in? No need to continue.
    // Throw them back to the main page
    redirect('/', context);
  }

  return {};
};

export default withApollo(CreateAccount);
