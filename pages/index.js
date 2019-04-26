import React from 'react';
import Text from 'mineral-ui/Text';
import Grid, {GridItem} from 'mineral-ui/Grid';
import Featured from '../components/featured';
import SearchControl from '../components/search-box/search-control';

import Logo from '../components/logo';

export default class Index extends React.Component {
  render() {
    return (
      <>
        <Grid breakpoints={['narrow', 'medium']}>
          <GridItem span={[4, 3, 2]}>
            <Logo />
          </GridItem>
          <GridItem span={[8, 9, 10]}>
            <Text as="h1" fontWeight="extraBold">
              Public Worship and Aids to Devotion
            </Text>
            <Text as="h2">PWAD Committee Website</Text>
            <Text appearance="prose">
              This website is provided by the PWAD Committee to help
              congregations within the Presbyterian Church of Australia.
            </Text>
            <Text appearance="prose">
              Use the below search field to find resources on the PWAD website,
              or go to one of the menu items for quick access to particular
              resources.
            </Text>
          </GridItem>
        </Grid>
        <SearchControl />
        <Featured />
      </>
    );
  }
}
