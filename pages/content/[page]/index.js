import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';

import withApollo from '../../../lib/with-apollo-client';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';
import Markdown from '../../../components/markdown/markdown';
import {PAGE_CONTENT} from '../../../components/queries';

function Search({name, content}) {
  return (
    <PageLayout>
      <ContentWrap>
        <Text as="h2">{name}</Text>
        {content.md && <Markdown>{content.md}</Markdown>}
      </ContentWrap>
    </PageLayout>
  );
}

Search.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.shape({
    md: PropTypes.string.isRequired
  }).isRequired
};

Search.getInitialProps = async function({apolloClient, query: {page}}) {
  const {data} = await apolloClient.query({
    query: PAGE_CONTENT,
    variables: {page}
  });

  if (data.pageContentOne) {
    return data.pageContentOne;
  }

  const err = new Error();
  err.code = 'ENOENT';
  throw err;
};

export default withApollo(Search);
