import React from 'react';
import gql from 'graphql-tag';
import {css} from 'react-emotion';
import {Query} from 'react-apollo';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Flex from 'mineral-ui/Flex';
import MineralLink from 'mineral-ui/Link';
import {createStyledComponent} from 'mineral-ui/styles';
import {ChevronDown as Chevron} from 'react-feather';
import Link from '../link';
import UserAvatar from './user-avatar';

const ME = gql`
  {
    me {
      profilePhoto
      name {
        first
        last
      }
    }
  }
`;

const noList = css`
  list-style: none;
`;

const flexRight = css`
  margin-left: auto;
`;

const NavMenuItem = createStyledComponent(Text, {
  letterSpacing: '1px',
  textTransform: 'uppercase',
  margin: '0 1em'
});

const NavLink = createStyledComponent(Link, {
  display: 'inline-flex',
  alignItems: 'center'
});

const ResponsiveMenuItem = createStyledComponent(NavMenuItem, {
  display: 'none'
});

const MenuButton = createStyledComponent(MineralLink, {
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
    const count = 0;

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
          <ResponsiveMenuItem element="li" fontWeight="bold">
            <MenuButton element="button" onClick={this.handleMenuClick}>
              Menu
            </MenuButton>
          </ResponsiveMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <NavLink prefetch href="/">
              Home
            </NavLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <NavLink prefetch href="/">
              GAA Publications
              <Chevron size="1em" />
            </NavLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <NavLink prefetch href="/">
              PWAD Resources
              <Chevron size="1em" />
            </NavLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <NavLink prefetch href="/">
              Useful links
              <Chevron size="1em" />
            </NavLink>
          </NavMenuItem>
          <NavMenuItem element="li" fontWeight="bold">
            <NavLink prefetch href="/">
              About
            </NavLink>
          </NavMenuItem>
          <Query query={ME}>
            {({data}) => {
              if (data.me) {
                return (
                  <>
                    <NavMenuItem
                      element="li"
                      fontWeight="bold"
                      className={flexRight}
                    >
                      <Link prefetch href="/auth/logout">
                        Log out
                      </Link>
                    </NavMenuItem>
                    <NavMenuItem element="li" fontWeight="bold">
                      <Link prefetch href="/short-list">
                        Short list ({count})
                      </Link>
                    </NavMenuItem>
                    <NavMenuItem element="li" fontWeight="bold">
                      <Link prefetch href="/my-account">
                        My account
                      </Link>
                    </NavMenuItem>
                    <NavMenuItem element="li">
                      <UserAvatar />
                    </NavMenuItem>
                  </>
                );
              }

              return (
                <>
                  <NavMenuItem
                    element="li"
                    fontWeight="bold"
                    className={flexRight}
                  >
                    <Link prefetch href="/sign-in">
                      Log in
                    </Link>
                  </NavMenuItem>
                  <NavMenuItem element="li" fontWeight="bold">
                    <Link prefetch href="/create-account">
                      Create account
                    </Link>
                  </NavMenuItem>
                </>
              );
            }}
          </Query>
        </Flex>
      </Box>
    );
  }
}

export default NavBar;
