import React from 'react';
import styled from 'react-emotion';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';

import NavBar from '../components/nav-bar/nav-bar';

const Footer = styled('footer')`
  padding: 15vh 1rem;
`;

export default class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar onMenuClick={this.handleMenuClick}/>
        <Box width={3 / 4} marginVertical={0} marginHorizontal="auto">
          <Text element="h1" fontWeight="extraBold">
            Public Worship and Aids to Devotion Committee Website
          </Text>
          <Text element="h2">PWAD Committee Website</Text>
          <Text appearance="prose">
            This website is provided by the PWAD Committee to help congregations within the
            Presbyterian Church of Australia.
          </Text>
          <Text appearance="prose">
            Use the below search field to find resources on the PWAD website, or follow the featured
            links for quick access to particular resources.
          </Text>
        </Box>
        <Footer>
          <hr/>
          <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
        </Footer>
      </React.Fragment>
    );
  }
}
