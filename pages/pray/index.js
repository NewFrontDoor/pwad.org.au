import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import {kebabCase} from 'lodash';
import Text from 'mineral-ui/Text';
import Pagination from 'mineral-ui/Pagination';

import withApollo from '../../lib/with-apollo-client';

import PageLayout from '../../components/page-layout';
import Link from '../../components/link';
import Markdown from '../../components/markdown/markdown';
import {FIND_PRAYER_CONTENTS, FIND_ONE_PRAYER} from '../../components/queries';

function Prayers({id}) {
  const [page, changePage] = useState(1);

  const {
    loading,
    error,
    data: {prayerPagination = {}}
  } = useQuery(FIND_PRAYER_CONTENTS, {
    variables: {page}
  });

  // Const firstId = get(prayerPagination, 'items.0._id');

  const {data: {prayerById} = {}} = useQuery(FIND_ONE_PRAYER, {
    variables: {id}
  });

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return `Error! ${error.message}`;
  }

  const {currentPage, itemCount, perPage} = prayerPagination.pageInfo;

  return (
    <>
      <Text as="ul">
        {prayerPagination.items.map(({_id, title}) => (
          <li key={_id}>
            <Link
              as={`/pray/${_id}/${kebabCase(title)}`}
              href="/pray/[id]/[name]"
            >
              {title}
            </Link>
          </li>
        ))}
      </Text>
      <Pagination
        size="small"
        currentPage={currentPage}
        pageSize={perPage}
        totalCount={itemCount}
        onPageChange={changePage}
      />
      {prayerById && <Markdown>{prayerById.content.md}</Markdown>}
    </>
  );
}

Prayers.propTypes = {
  id: PropTypes.string
};

Prayers.defaultProps = {
  id: undefined
};

function Pray({id}) {
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
      <Prayers id={id} />
    </PageLayout>
  );
}

Pray.propTypes = {
  id: PropTypes.string
};

Pray.defaultProps = {
  id: undefined
};

Pray.getInitialProps = function({query: {id}}) {
  return {id};
};

export default withApollo(Pray);
