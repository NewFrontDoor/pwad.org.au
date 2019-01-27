import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'react-emotion';
import {Query} from 'react-apollo';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import {ChevronDown as Chevron} from 'react-feather';
import {createStyledComponent} from 'mineral-ui/styles';
import Box from 'mineral-ui/Box';
import Dropdown from 'mineral-ui/Dropdown';
import LinkButton from '../link-button';
import Media from '../media';
import Link from '../link';
import {MENU_WITH_RESOURCES, ME} from '../queries';
import UserAvatar from './user-avatar';

const noList = css`
  list-style: none;
`;

const DropdownItem = ({name}) => {
  return (
    <Box padding="md">
      <Link href={name}>{name}</Link>
    </Box>
  );
};

DropdownItem.propTypes = {
  name: PropTypes.string.isRequired
};

const NavMenuItem = createStyledComponent(Text, {
  display: 'inline-flex',
  alignItems: 'center',
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
          <Link prefetch href="/">
            Home
          </Link>
        </NavMenuItem>
        <Query query={MENU_WITH_RESOURCES}>
          {({data}) =>
            data.menuWithResources.map(menu => (
              <NavMenuItem key={menu._id} element="li" fontWeight="bold">
                <Dropdown
                  data={menu.resources}
                  item={({props}) => <DropdownItem {...props} />}
                >
                  <LinkButton>
                    {menu.name}
                    <Chevron size="1em" />
                  </LinkButton>
                </Dropdown>
              </NavMenuItem>
            ))
          }
        </Query>
        <NavMenuItem element="li" fontWeight="bold">
          <Link prefetch href="/">
            About
          </Link>
        </NavMenuItem>
        <Media query="medium">
          <Spacer />
        </Media>
        <Query query={ME}>
          {({data}) => {
            if (data.me) {
              return (
                <>
                  <NavMenuItem element="li" fontWeight="bold">
                    <Link href="/auth/logout">Log out</Link>
                  </NavMenuItem>
                  <NavMenuItem element="li" fontWeight="bold">
                    <Link prefetch href="/short-list">
                      Short list ({count})
                    </Link>
                  </NavMenuItem>
                  <Media query="medium">
                    <NavMenuItem element="li" fontWeight="bold">
                      <Link prefetch href="/my-account">
                        My account
                      </Link>
                    </NavMenuItem>
                  </Media>
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
