/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import {Query} from 'react-apollo';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import {ChevronDown as Chevron} from 'react-feather';
import styled from '@emotion/styled';
import Box from 'mineral-ui/Box';
import Dropdown from 'mineral-ui/Dropdown';
import LinkButton from '../link-button';
import Media from '../media';
import Link from '../link';
import {MENUS, ME} from '../queries';
import UserAvatar from './user-avatar';

const noList = css`
  list-style: none;
`;

const DropdownItem = ({name, url, file, content}) => {
  let as;
  let href = file ? file.url : url;

  if (content) {
    href = `/content?page=${content.key}`;
    as = `/content/${content.key}`;
  }

  return (
    <Box padding="md">
      <Link href={href} as={as}>
        {name}
      </Link>
    </Box>
  );
};

DropdownItem.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  file: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  content: PropTypes.shape({
    key: PropTypes.string.isRequired
  })
};

DropdownItem.defaultProps = {
  url: undefined,
  file: undefined,
  content: undefined
};

const NavMenuItem = styled(Text)({
  display: 'inline-flex',
  alignItems: 'center',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  margin: '0 1em'
});

const Spacer = styled('li')({
  marginLeft: 'auto'
});

class Nav extends React.Component {
  render() {
    const count = 0;

    return (
      <Flex
        as="ul"
        justifyContent="between"
        padding="0"
        width="100%"
        css={noList}
        breakpoints={['narrow', 'medium']}
        direction={['column', 'column', 'row']}
      >
        <NavMenuItem as="li" fontWeight="bold">
          <Link prefetch href="/">
            Home
          </Link>
        </NavMenuItem>
        <Query query={MENUS}>
          {({data}) =>
            data.menuMany.map(menu => (
              <NavMenuItem key={menu._id} as="li" fontWeight="bold">
                {menu.link ? (
                  <Link
                    prefetch
                    href={`/content?page=${menu.link.key}`}
                    as={`/content/${menu.link.key}`}
                  >
                    {menu.link.name}
                  </Link>
                ) : (
                  <Dropdown
                    data={menu.resources}
                    item={({props}) => <DropdownItem {...props} />}
                  >
                    <LinkButton>
                      {menu.name}
                      <Chevron size="1em" />
                    </LinkButton>
                  </Dropdown>
                )}
              </NavMenuItem>
            ))
          }
        </Query>
        <Media query="medium">
          <Spacer />
        </Media>
        <Query query={ME}>
          {({data}) => {
            if (data.me) {
              return (
                <>
                  <NavMenuItem as="li" fontWeight="bold">
                    <Link href="/auth/logout">Log out</Link>
                  </NavMenuItem>
                  <NavMenuItem as="li" fontWeight="bold">
                    <Link prefetch href="/short-list">
                      Short list ({count})
                    </Link>
                  </NavMenuItem>
                  <Media query="medium">
                    <NavMenuItem as="li" fontWeight="bold">
                      <Link prefetch href="/my-account">
                        My account
                      </Link>
                    </NavMenuItem>
                  </Media>
                  <NavMenuItem as="li">
                    <UserAvatar />
                  </NavMenuItem>
                </>
              );
            }

            return (
              <>
                <NavMenuItem as="li" fontWeight="bold">
                  <Link prefetch href="/sign-in">
                    Log in
                  </Link>
                </NavMenuItem>
                <NavMenuItem as="li" fontWeight="bold">
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
