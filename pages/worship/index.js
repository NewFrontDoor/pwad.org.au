import React from 'react';
import Text from 'mineral-ui/Text';

import withApollo from '../../lib/with-apollo-client';

import PageLayout from '../../components/page-layout';
import LitergySearchControl from '../../components/search-box/liturgy-search-control';

function Rejoice() {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Text as="h2">Worship</Text>
      <Text appearance="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Text>
      <LitergySearchControl />
    </PageLayout>
  );
}

export default withApollo(Rejoice);
