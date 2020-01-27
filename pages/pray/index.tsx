import React from 'react';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';

import withApollo from '../../lib/with-apollo-client';
import PageLayout from '../../components/page-layout';
import PraySearchControl from '../../components/search-box/pray-search-control';

const Pray: NextPage = () => {
  return (
    <PageLayout>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Pray</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <PraySearchControl />
    </PageLayout>
  );
};

export default withApollo(Pray);
