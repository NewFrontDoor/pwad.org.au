import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Text from 'mineral-ui/Text';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';
import Link, {
  hymnLinkProps,
  prayerLinkProps,
  liturgyLinkProps
} from '../../../components/link';
import {FIND_ONE_KEYWORD} from '../../../components/queries';

function Keyword({id}) {
  const {
    loading,
    error,
    data: {keywordById}
  } = useQuery(FIND_ONE_KEYWORD, {
    variables: {id}
  });

  const {name, hymns, prayers, liturgies} = keywordById || {};

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <ContentWrap>
        {loading && 'Loading...'}
        {error && `Error! ${error.message}`}
        {keywordById && (
          <>
            <Text as="h2">{name}</Text>
            {hymns.length > 0 && (
              <>
                <Text as="h3">Hymns</Text>
                <Text as="ul">
                  {hymns.map(hymn => (
                    <li key={hymn._id}>
                      <Link {...hymnLinkProps(hymn)} />
                    </li>
                  ))}
                </Text>
              </>
            )}
            {prayers.length > 0 && (
              <>
                <Text as="h3">Prayers</Text>
                <Text as="ul">
                  {prayers.map(prayer => (
                    <li key={prayer._id}>
                      <Link {...prayerLinkProps(prayer)} />
                    </li>
                  ))}
                </Text>
              </>
            )}
            {liturgies.length > 0 && (
              <>
                <Text as="h3">Liturgy</Text>
                <Text as="ul">
                  {liturgies.map(liturgy => (
                    <li key={liturgy._id}>
                      <Link {...liturgyLinkProps(liturgy)} />
                    </li>
                  ))}
                </Text>
              </>
            )}
          </>
        )}
      </ContentWrap>
    </PageLayout>
  );
}

Keyword.getInitialProps = function({query: {id}}) {
  return {id};
};

Keyword.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Keyword);
