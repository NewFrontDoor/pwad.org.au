import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import {kebabCase} from 'lodash';
import Pagination from 'mineral-ui/Pagination';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import Link, {authorLinkProps} from '../../../components/link';
import Markdown from '../../../components/markdown/markdown';
import ShortListButton from '../../../components/shortlist-button';
import {
  FIND_ONE_PRAYER,
  FIND_PRAYER_CONTENTS
} from '../../../components/queries';

function PrayerById({id}) {
  const {loading, error, data: {prayerById} = {}} = useQuery(FIND_ONE_PRAYER, {
    variables: {id}
  });

  const {author, content, title, copyright} = prayerById || {};

  return (
    <>
      {loading && 'Loading...'}
      {error && `Error! ${error.message}`}
      {prayerById && (
        <Flex
          gutterWidth="xxl"
          breakpoints={['narrow', 'medium']}
          direction={['column-reverse', 'column-reverse', 'row']}
        >
          <FlexItem>
            {author && (
              <>
                <Text as="h3">Hymn Author</Text>
                <Text>
                  <Link {...authorLinkProps(author)} />
                </Text>
              </>
            )}

            {copyright && (
              <>
                <Text as="h3">Copyright</Text>
                <Text>{copyright.name || '-'}</Text>
              </>
            )}
          </FlexItem>
          <FlexItem width="100%">
            <Text as="h2">
              <ShortListButton hymn={prayerById} />
              {title}
            </Text>
            {content && <Markdown>{content.md}</Markdown>}
          </FlexItem>
        </Flex>
      )}
    </>
  );
}

PrayerById.propTypes = {
  id: PropTypes.string.isRequired
};

function Prayers() {
  const [page, changePage] = useState(1);

  const {loading, error, data: {prayerPagination = {}} = {}} = useQuery(
    FIND_PRAYER_CONTENTS,
    {
      variables: {page}
    }
  );

  // Const firstId = get(prayerPagination, 'items.0._id');

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
    </>
  );
}

function Prayer({id}) {
  return (
    <PageLayout>
      <Text as="h1" fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Text>
      <PrayerById id={id} />
      <Prayers id={id} />
    </PageLayout>
  );
}

Prayer.getInitialProps = async function({query: {id}}) {
  return {id};
};

Prayer.propTypes = {
  id: PropTypes.string.isRequired
};

export default withApollo(Prayer);
