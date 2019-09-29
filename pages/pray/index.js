import React from 'react';
import Text from 'mineral-ui/Text';

import withApollo from '../../lib/with-apollo-client';

import PageLayout from '../../components/page-layout';
import PraySearchControl from '../../components/search-box/pray-search-control';

function Pray() {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Text as="h2">Pray</Text>
      <Text appearance="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Text>
      <PraySearchControl />
    </PageLayout>
  );
}

export default withApollo(Pray);
