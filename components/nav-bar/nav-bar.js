import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';
import Link from 'mineral-ui/Link';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Flex from 'mineral-ui/Flex';
import {createStyledComponent} from 'mineral-ui/styles';
import NextLink from 'next/link';

const noList = css`
  list-style: none;
`;

const flexRight = css`
  margin-left: auto;
`;

function TextLink({href, children}) {
  return (
    <NextLink
      passHref
      href={href}
    >
      <Link>
        {children}
      </Link>
    </NextLink>
  );
}

TextLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const NavMenuItem = createStyledComponent(Text, {
  letterSpacing: '1px',
  textTransform: 'uppercase',
  margin: '0 1em'
});

const MenuButton = createStyledComponent(Link, {
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  fontWeight: 'inherit',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer'
});

class NavBar extends React.Component {
  constuctor() {
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    console.log('toggle');
  }

  render() {
    return (
      <Box
        element="nav"
        breakpoints={['narrow', 'medium']}
        paddingVertical={['0', '0', '15vh']}
        marginHorizontal="auto"
      >
        <Flex
          element="ul"
          justifyContent="between"
          padding="0"
          className={noList}
          breakpoints={['narrow', 'medium']}
          direction={['column', 'column', 'row']}
        >
          <NavMenuItem element="li" fontWeight="bold">
            <MenuButton element="button" onClick={this.handleMenuClick}>
              Menu
            </MenuButton>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              Home
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              What is worship?
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              Worship directory
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              Worship aids
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              Useful links
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold" className={flexRight}>
            <TextLink href="/">
              Log in
            </TextLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <TextLink href="/">
              Create account
            </TextLink>
          </NavMenuItem>
        </Flex>
      </Box>
    );
  }
}

export default NavBar;
