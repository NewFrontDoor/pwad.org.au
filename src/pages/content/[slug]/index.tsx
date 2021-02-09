import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Styled} from 'theme-ui';
import BlockContent from '../../../components/block-content';

import is from '../../../is';
import * as pageContentQuery from '../../../../queries/page-content';
import * as resourceQuery from '../../../../queries/resource';
import {PageContent, MenuItem} from '../../../../queries/_types';

import Toc from '../../../components/toc';

import PageLayout from '../../../components/page-layout';
import ContentWrap from '../../../components/content-wrap';

type ContentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Content: NextPage<ContentProps> = ({menuItems, pageContent}) => {
  const hasToc = pageContent.hasToc;
  const subtitle = pageContent.subtitle;

  return (
    <PageLayout menuItems={menuItems}>
      <ContentWrap>
        <Styled.h1>{pageContent.title}</Styled.h1>
        {subtitle && <Styled.h2>{subtitle}</Styled.h2>}
        {hasToc && <Toc blocks={pageContent.content} />}
        <BlockContent blocks={pageContent.content} />
      </ContentWrap>
    </PageLayout>
  );
};

Content.propTypes = {
  pageContent: PropTypes.exact({
    _id: PropTypes.string.isRequired,
    _type: is('pageContent'),
    content: PropTypes.array.isRequired,
    hasToc: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  menuItems: PropTypes.array.isRequired
};

export default Content;

export const getServerSideProps: GetServerSideProps<{
  pageContent: PageContent;
  menuItems: MenuItem[];
}> = async function (context) {
  let slug = context.params?.slug;

  if (Array.isArray(slug)) {
    slug = slug[0];
  }

  if (typeof slug === 'undefined') {
    return {
      notFound: true
    };
  }

  const menuItems = await resourceQuery.menuItems();
  const pageContent = await pageContentQuery.getBySlug(slug);

  return {
    props: {
      menuItems,
      pageContent
    }
  };
};
