import React from 'react';
import PropTypes from 'prop-types';
import {NextPage, GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Styled, Box, Grid} from 'theme-ui';

import {initializeApollo} from '../../lib/apollo/client';
import * as resourceQuery from '../../queries/resource';
import {MenuItem} from '../../queries/_types';
import {useHomeQuery, HomeDocument} from '../components/queries';
import PageLayout from '../components/page-layout';
import Featured from '../components/featured';
import SearchControl from '../components/search-box/search-control';
import BlockContent from '../components/block-content';
import Logo from '../components/logo';

type IndexPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Index: NextPage<IndexPageProps> = ({menuItems}) => {
  const {data} = useHomeQuery();

  return (
    <PageLayout menuItems={menuItems}>
      <Grid columns={['1fr 3fr', '1fr 5fr']}>
        <Box
          sx={{
            gridRow: ['1/2', '1/3'],
            maxWidth: ['10em', '20em'],
            alignItems: 'middle'
          }}
        >
          <Logo />
        </Box>
        <Styled.h1
          sx={{
            gridRow: '1/2',
            fontWeight: 'bold'
          }}
        >
          {data?.main?.heading}
        </Styled.h1>
        <Box sx={{gridColumn: ['1/3', '2/3'], gridRow: [null, '2/3']}}>
          <BlockContent blocks={data?.main?.blurb} />
        </Box>
      </Grid>
      <SearchControl />
      <Featured />
    </PageLayout>
  );
};

Index.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export const getServerSideProps: GetServerSideProps<{
  menuItems: MenuItem[];
}> = async function (context) {
  const apolloClient = initializeApollo();

  await apolloClient.query({query: HomeDocument, context});
  const menuItems = await resourceQuery.menuItems();

  return {
    props: {
      menuItems,
      initialApolloState: apolloClient.cache.extract()
    }
  };
};

export default Index;
