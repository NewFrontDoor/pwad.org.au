import React from 'react';
import {NextPage} from 'next';
import {Text, Styled} from 'theme-ui';

import withApollo from '../../lib/with-apollo-client';
import PageLayout from '../components/page-layout';
import ContentWrap from '../components/content-wrap';
import Link, {linkProps} from '../components/link';
import ShortListButton from '../components/shortlist-button';

import {useMeQuery} from '../components/queries';
import {prefetchSearchResult} from '../prefetch';

const ShortList: NextPage = () => {
  const {data, client} = useMeQuery();

  return (
    <PageLayout>
      <Styled.h1>
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <ContentWrap>
        <Styled.h2>My Short List</Styled.h2>

        {data?.me && (
          <Text variant="listNone" as="ul">
            {data.me.shortlist.map(item => (
              <li key={item._id}>
                <ShortListButton item={item} />{' '}
                <Link
                  {...linkProps(item)}
                  onMouseOver={() => prefetchSearchResult(client, item)}
                />
              </li>
            ))}
          </Text>
        )}
      </ContentWrap>
    </PageLayout>
  );
};

export default withApollo(ShortList);
