import React from 'react';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';

import redirect from '../../lib/redirect';
import checkLoggedIn from '../../lib/check-logged-in';
import withApollo, {WithApolloPageContext} from '../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../lib/abilities';

import PageLayout from '../../components/page-layout';
import SongSearchControl from '../../components/search-box/song-search-control';

const Rejoice: NextPage = () => {
  return (
    <PageLayout>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Rejoice</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <SongSearchControl />
    </PageLayout>
  );
};

Rejoice.getInitialProps = async (context: WithApolloPageContext) => {
  const {loggedInUser} = await checkLoggedIn(context.apolloClient);

  if (loggedInUser.user) {
    const ability = defineAbilitiesFor(loggedInUser.user);

    if (ability.can('read', 'Hymn')) {
      return;
    }

    redirect(context, '/my-account');
  }

  redirect(context, '/sign-in');
};

export default withApollo(Rejoice);
