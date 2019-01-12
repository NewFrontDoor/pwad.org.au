import React from 'react';
import Text from 'mineral-ui/Text';
import Flex from 'mineral-ui/Flex';
import FlexItem from 'mineral-ui/Flex/FlexItem';
import SearchControl from '../components/search-box/search-control';

import Logo from '../components/logo';

export default class Index extends React.Component {
  render() {
    return (
      <>
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
              This website is provided by the PWAD Committee to help
              congregations within the Presbyterian Church of Australia.
            </Text>
            <Text appearance="prose">
              Use the below search field to find resources on the PWAD website,
              or follow the featured links for quick access to particular
              resources.
            </Text>
          </FlexItem>
        </Flex>
        <SearchControl />
      </>
    );
  }
}
