import React from 'react';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';

import redirect from '../../../lib/redirect';
import withApollo, {
  WithApolloPageContext
} from '../../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../../lib/abilities';

import checkLoggedIn from '../../check-logged-in';
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

    if (ability.cannot('read', 'Hymn')) {
      redirect('/my-account', context);
    }
  } else {
    redirect('/api/login', context);
  }
};

export default withApollo(Rejoice);
