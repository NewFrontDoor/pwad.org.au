import React from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import Grid, {GridItem} from 'mineral-ui/Grid';
import BlockContent from '@sanity/block-content-to-react';

import {fetchQuery} from '../lib/sanity';
import withApollo from '../lib/with-apollo-client';
import PageLayout from '../components/page-layout';
import Featured from '../components/featured';
import SearchControl from '../components/search-box/search-control';
import Logo from '../components/logo';

const serializers = {
  types: {
    block(props) {
      return <Text appearance="prose" {...props} />;
    }
  }
};

function Index({blurb, heading, menuitems, subheading}) {
  return (
    <PageLayout menuItems={menuitems}>
      <Grid breakpoints={['narrow', 'medium']}>
        <GridItem span={[4, 3, 2]}>
          <Logo />
        </GridItem>
        <GridItem span={[8, 9, 10]}>
          <Text as="h1" fontWeight="extraBold">
            {heading}
          </Text>
          <Text as="h2">{subheading}</Text>
          <BlockContent blocks={blurb} serializers={serializers} />
        </GridItem>
      </Grid>
      <SearchControl />
      <Featured />
    </PageLayout>
  );
}

Index.propTypes = {
  blurb: PropTypes.array.isRequired,
  heading: PropTypes.string.isRequired,
  menuitems: PropTypes.array.isRequired,
  subheading: PropTypes.string.isRequired
};

Index.getInitialProps = async () => {
  const [result] = await fetchQuery(
    ['*']
      .concat(['[_type == "main"]', '[!(_id in path("drafts.**"))]'])
      .concat(['{blurb, heading, menuitems, subheading}'])
      .join('|')
  );

  return result;
};

export default withApollo(Index);
