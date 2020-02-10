import React from 'react';
import PropTypes from 'prop-types';
import {NextPage} from 'next';
import {Styled} from 'theme-ui';
import BlockContent from '../../../components/block-content';

import withApollo from '../../../../lib/with-apollo-client';
import {usePageContentQuery} from '../../../components/queries';
import Toc from '../../../components/toc';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';
import Loading from '../../../components/loading';

type ContentProps = {
  page: string;
};

const Content: NextPage<ContentProps> = ({page}) => {
  const {data, loading} = usePageContentQuery({variables: {page}});
  const hasToc = data?.pageContentOne.hasToc;
  const subtitle = data?.pageContentOne.subtitle;

  return (
    <PageLayout>
      <ContentWrap>
        {loading && <Loading />}
        {data && <Styled.h1>{data.pageContentOne.title}</Styled.h1>}
        {subtitle && <Styled.h2>{subtitle}</Styled.h2>}
        {hasToc && <Toc blocks={data.pageContentOne.content} />}
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
