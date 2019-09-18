import React from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Text from 'mineral-ui/Text';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import Link, {hymnLinkProps, liturgyLinkProps} from '../../../components/link';
import {FIND_ONE_AUTHOR} from '../../../components/queries';

function Author({id}) {
  const {loading, error, data: {authorById} = {}} = useQuery(FIND_ONE_AUTHOR, {
    variables: {id}
  });

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {authorById && (
        <>
          <Text as="h3">Author</Text>
          <Text>
            {authorById.name.first} {authorById.name.last}{' '}
            {authorById.dates && `(${authorById.dates})`}
          </Text>
          {authorById.hymns.length > 0 && (
            <>
              <Text as="h3">Hymns</Text>
              <Text as="ul">
                {authorById.hymns.map(hymn => (
                  <li key={hymn._id}>
                    <Link {...hymnLinkProps(hymn)} />
                  </li>
                ))}
              </Text>
            </>
          )}
          {authorById.liturgies.length > 0 && (
            <>
              <Text as="h3">Liturgies</Text>
              <Text as="ul">
                {authorById.liturgies.map(liturgy => (
                  <li key={liturgy._id}>
                    <Link {...liturgyLinkProps(liturgy)} />
                  </li>
                ))}
              </Text>
            </>
          )}
        </>
      )}
    </PageLayout>
  );
}

Author.getInitialProps = ({query: {id}}) => {
  return {id};
};

Author.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Author);
