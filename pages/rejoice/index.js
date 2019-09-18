import React from 'react';
import Text from 'mineral-ui/Text';

import redirect from '../../lib/redirect';
import checkLoggedIn from '../../lib/check-logged-in';
import withApollo from '../../lib/with-apollo-client';
import {defineAbilitiesFor} from '../../lib/abilities';

import PageLayout from '../../components/page-layout';
import SongSearchControl from '../../components/search-box/song-search-control';

function Rejoice() {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Text as="h2">Rejoice</Text>
      <Text appearance="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Text>
      <SongSearchControl />
    </PageLayout>
  );
}

Rejoice.getInitialProps = async function(context) {
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
