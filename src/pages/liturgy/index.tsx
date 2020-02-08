import React from 'react';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../components/page-layout';
import LiturgySearchControl from '../../components/search-box/liturgy-search-control';

const Liturgy: NextPage = () => {
  return (
    <PageLayout>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Worship</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <LiturgySearchControl />
    </PageLayout>
  );
};

export default withApollo(Liturgy);
