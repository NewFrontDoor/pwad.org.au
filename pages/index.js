import React from 'react';
import styled from 'react-emotion';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Flex from 'mineral-ui/Flex';
import FlexItem from 'mineral-ui/Flex/FlexItem';
import SearchBox from '../components/search-box/search-box';

import Logo from '../components/logo';

export default class Index extends React.Component {
  render() {
    return (
      <Box width={3 / 4} marginVertical={0} marginHorizontal="auto">
          <Flex>
            <FlexItem grow={2} width="20%">
              <Logo />
            </FlexItem>
            <FlexItem grow={2}>
              <Text element="h1" fontWeight="extraBold">
                Public Worship and Aids to Devotion
              </Text>
              <Text element="h2">PWAD Committee Website</Text>
              <Text appearance="prose">
                This website is provided by the PWAD Committee to help congregations
                within the Presbyterian Church of Australia.
              </Text>
              <Text appearance="prose">
                Use the below search field to find resources on the PWAD website, or
                follow the featured links for quick access to particular resources.
              </Text>
            </FlexItem>
          </Flex>
          <SearchBox />
      </Box>
    );
  }
}
