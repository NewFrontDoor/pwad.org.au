import React from 'react';
import styled from 'react-emotion';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';

import NavBar from '../components/nav-bar/nav-bar';
import SearchBox from '../components/search-box/search-box';

const Footer = styled('footer')`
  padding: 15vh 1rem;
`;

export default class Search extends React.Component {
  render() {
    return (
      <>
        <NavBar onMenuClick={this.handleMenuClick} />
        <Box width={3 / 4} marginVertical={0} marginHorizontal="auto">
          <Text element="h1" fontWeight="extraBold">
            Public Worship and Aids to Devotion Committee Website
          </Text>
          <Text element="h2">Search</Text>
          <Text appearance="prose">
            Search for hymns, worship resources, prayer resources and worship
            aids using the search box below. Advanced search will allow you to
            refine your criteria on data available in the resource.
          </Text>
          <SearchBox />
        </Box>
        <Footer>
          <hr />
          <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
        </Footer>
      </>
    );
  }
}
