import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import {css} from 'react-emotion';
import {Query} from 'react-apollo';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import {ChevronDown as Chevron} from 'react-feather';
import {createStyledComponent} from 'mineral-ui/styles';
import Media from '../media';
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

const NavLink = createStyledComponent(Link, {
  display: 'inline-flex',
  alignItems: 'center'
});

const NavMenuItem = createStyledComponent(Text, {
  letterSpacing: '1px',
  textTransform: 'uppercase',
  margin: '0 1em'
});

const Spacer = createStyledComponent('li', {
  marginLeft: 'auto'
});

class Nav extends React.Component {
  render() {
    const count = 0;

    return (
      <Flex
        element="ul"
        justifyContent="between"
        padding="0"
        width="100%"
        className={noList}
        breakpoints={['narrow', 'medium']}
        direction={['column', 'column', 'row']}
      >
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
        <Media query="bp_medium">
          <Spacer />
        </Media>
        <Query query={ME}>
          {({data}) => {
            if (data.me) {
              return (
                <>
                  <NavMenuItem element="li" fontWeight="bold">
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
                <NavMenuItem element="li" fontWeight="bold">
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
    );
  }
}

export default Nav;
