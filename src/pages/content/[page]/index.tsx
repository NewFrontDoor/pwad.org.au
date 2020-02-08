import React from 'react';
import PropTypes from 'prop-types';
import {NextPage} from 'next';
import {Text} from 'theme-ui';
import BlockContent from '../../../components/block-content';

import withApollo from '../../../lib/with-apollo-client';
import {usePageContentQuery} from '../../../components/queries';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';

type ContentProps = {
  page: string;
};

const Content: NextPage<ContentProps> = ({page}) => {
  const {data} = usePageContentQuery({variables: {page}});

  return (
    <PageLayout>
      <ContentWrap>
        {data && <Text as="h2">{data.pageContentOne.title}</Text>}
        {data && <BlockContent blocks={data.pageContentOne.content} />}
      </ContentWrap>
    </PageLayout>
  );
};

Content.getInitialProps = ({query: {page}}) => {
  if (Array.isArray(page)) {
    return {page: page[0]};
  }

  return {page};
};

Content.propTypes = {
  page: PropTypes.string.isRequired
};

export default withApollo(Content);
