import React from 'react';
import {NextPage} from 'next';
import {Styled, Box, Grid} from 'theme-ui';

import withApollo from '../../lib/with-apollo-client';
import {useHomeQuery} from '../components/queries';
import PageLayout from '../components/page-layout';
import Featured from '../components/featured';
import SearchControl from '../components/search-box/search-control';
import BlockContent from '../components/block-content';
import Logo from '../components/logo';
import Loading from '../components/loading';

const Index: NextPage = () => {
  const {loading, data} = useHomeQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <PageLayout>
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
          {data?.main.heading}
        </Styled.h1>
        <Box sx={{gridColumn: ['1/3', '2/3'], gridRow: [null, '2/3']}}>
          <BlockContent blocks={data?.main.blurb} />
        </Box>
      </Grid>
      <SearchControl />
      <Featured />
    </PageLayout>
  );
};

export default withApollo(Index);
