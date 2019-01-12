import React from 'react';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import styled from 'react-emotion';

const FooterBox = styled(Box)`
  padding: 15vh 1rem;
`;

class Footer extends React.Component {
  render() {
    return (
      <FooterBox>
        <hr />
        <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
      </FooterBox>
    );
  }
}

export default Footer;
