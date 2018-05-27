import React from 'react';
import styled from 'react-emotion';
import Box from './system/system';

const Heading = styled.h1``;

const Flex = styled(Box)`
  display: flex;
`;

const Text = styled.p``;

export default () => (
  <Flex width={3 / 4} my={0} mx="auto">
    <Box width={1 / 2}>
      <Heading>Public Worship and Aids to Devotion Committee Website</Heading>
    </Box>
    <Box width={1 / 2}>
      <Text>
        This website is provided by the PWAD Committee to help congregations
        within the Presbyterian Church of Australia. This is a long
        page...please scroll down.
      </Text>
    </Box>
  </Flex>
);
