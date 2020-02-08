import React from 'react';
import {NextPage} from 'next';
import PropTypes from 'prop-types';
import {Text} from 'theme-ui';

import withApollo from '../../../../lib/with-apollo-client';

import {useFindOneAuthorQuery} from '../../../components/queries';
import PageLayout from '../../../components/page-layout';
import Link, {hymnLinkProps, liturgyLinkProps} from '../../../components/link';

type AuthorProps = {
  id: string;
};

const Author: NextPage<AuthorProps> = ({id}) => {
  const {data} = useFindOneAuthorQuery({
    variables: {
      id
    }
  });
  const {name, dates, hymns, liturgies} = data?.authorById ?? {};

  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <Text as="h3">Author</Text>
      <Text>
        {name} {dates && `(${dates})`}
      </Text>
      {hymns?.length > 0 && (
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
      {liturgies?.length > 0 && (
        <>
          <Text as="h3">Liturgies</Text>
          <Text as="ul">
            {liturgies.map(liturgy => (
              <li key={liturgy._id}>
                <Link {...liturgyLinkProps(liturgy)} />
              </li>
            ))}
          </Text>
        </>
      )}
    </PageLayout>
  );
};

Author.getInitialProps = ({query: {id}}) => {
  if (Array.isArray(id)) {
    return {id: id[0]};
  }

  return {id};
};

Author.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Author);
