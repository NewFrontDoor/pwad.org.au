import React from 'react';
import Text from 'mineral-ui/Text';
import {useQuery} from '@apollo/react-hooks';

import withApollo from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';
import ContentWrap from '../components/content-wrap';
import Link, {hymnLinkProps} from '../components/link';
import ShortListButton from '../components/shortlist-button';

import {ME} from '../components/queries';

function ShortList() {
  const {
    data: {me}
  } = useQuery(ME);

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ContentWrap>
        <Text as="h2">My Short List</Text>

        {me && (
          <Text as="ul" appearance="prose">
            {me.shortlist.map(hymn => (
              <li key={hymn._id}>
                <ShortListButton hymn={hymn} />{' '}
                <Link {...hymnLinkProps(hymn)} />
              </li>
            ))}
          </Text>
        )}
      </ContentWrap>
    </PageLayout>
  );
}

export default withApollo(ShortList);
