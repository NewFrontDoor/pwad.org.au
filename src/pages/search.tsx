import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Styled} from 'theme-ui';

import * as resourceQuery from '../../queries/resource';
import {MenuItem} from '../../queries/_types';
import PageLayout from '../components/page-layout';
import SearchControl from '../components/search-box/search-control';

type SearchPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Search: NextPage<SearchPageProps> = ({menuItems}) => {
  return (
    <PageLayout menuItems={menuItems}>
      <Styled.h1 fontWeight="extraBold">
        Public Worship and Aids to Devotion Committee Website
      </Styled.h1>
      <Styled.h2>Search</Styled.h2>
      <Styled.p variant="prose">
        Search for hymns, worship resources, prayer resources and worship aids
        using the search box below. Advanced search will allow you to refine
        your criteria on data available in the resource.
      </Styled.p>
      <SearchControl />
    </PageLayout>
  );
};

Search.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
}> = async function () {
  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems
    }
  };
};

export default Search;
