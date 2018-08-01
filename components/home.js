import React from 'react';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';

export default () => (
  <Flex width={3 / 4} my={0} mx="auto">
    <FlexItem width={1 / 2}>
      <Text element="h1" fontWeight="extraBold">Public Worship and Aids to Devotion Committee Website</Text>
    </FlexItem>
    <FlexItem width={1 / 2}>
      <Text appearance="prose">
        This website is provided by the PWAD Committee to help congregations
        within the Presbyterian Church of Australia. This is a long
        page...please scroll down.
      </Text>
    </FlexItem>
  </Flex>
);
