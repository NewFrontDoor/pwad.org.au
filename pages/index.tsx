import React from 'react';
import {NextPage} from 'next';
import {Styled, Box, Grid} from 'theme-ui';

import withApollo from '../lib/with-apollo-client';
import {useHomeQuery} from '../components/queries';
import PageLayout from '../components/page-layout';
import Featured from '../components/featured';
import SearchControl from '../components/search-box/search-control';
import BlockContent from '../components/block-content';
import Logo from '../components/logo';

const Index: NextPage = () => {
  const {loading, data} = useHomeQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <PageLayout>
      <Grid columns={[1, '1fr 5fr']}>
        <Box
          sx={{
            maxWidth: ['10em', '20em']
          }}
        >
          <Logo />
        </Box>
        <Box>
          <Styled.h1
            sx={{
              fontWeight: 'bold'
            }}
          >
            {data.main.heading}
          </Styled.h1>
          <Styled.h2>{data.main.subheading}</Styled.h2>
          <BlockContent blocks={data.main.blurb} />
        </Box>
      </Grid>
      <SearchControl />
      <Featured />
    </PageLayout>
  );
};

export default withApollo(Index);
