/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import PropTypes from 'prop-types';
import {useQuery} from '@apollo/react-hooks';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import {ChevronDown as Chevron} from 'react-feather';
import styled from '@emotion/styled';
import Box from 'mineral-ui/Box';
import Dropdown from 'mineral-ui/Dropdown';
import LinkButton from '../link-button';
import {useMediumMedia} from '../use-media';
import Link from '../link';
import {MENUS, ME} from '../queries';
import UserAvatar from './user-avatar';

const noList = css`
  list-style: none;
`;

const DropdownItem = ({name, url, file, type, content}) => {
  let as;
  let internal = true;
  let href = url;

  if (type === 'file') {
    internal = false;
    href = file.url;
  }

  if (content) {
    href = `/content/[page]`;
    as = `/content/${content.key}`;
  }

  return (
    <Box padding="md">
      <Link href={href} as={as} internal={internal}>
        {name}
      </Link>
    </Box>
  );
};

DropdownItem.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
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

function Nav() {
  const isMedium = useMediumMedia();

  const {
    data: {menuMany = []}
  } = useQuery(MENUS);

  const {
    data: {me}
  } = useQuery(ME);

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
        <Link href="/">Home</Link>
      </NavMenuItem>
      {menuMany.map(menu => (
        <NavMenuItem key={menu._id} as="li" fontWeight="bold">
          {menu.link ? (
            <Link href="/content/[page]" as={`/content/${menu.link.key}`}>
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
      ))}
      {isMedium && <Spacer />}
      {me ? (
        <>
          <NavMenuItem as="li" fontWeight="bold">
            <Link href="/auth/logout">Log out</Link>
          </NavMenuItem>
          <NavMenuItem as="li" fontWeight="bold">
            <Link href="/short-list">Short list ({me.shortlist.length})</Link>
          </NavMenuItem>
          {isMedium && (
            <NavMenuItem as="li" fontWeight="bold">
              <Link href="/my-account">My account</Link>
            </NavMenuItem>
          )}
          <NavMenuItem as="li">
            <UserAvatar />
          </NavMenuItem>
        </>
      ) : (
        <>
          <NavMenuItem as="li" fontWeight="bold">
            <Link href="/sign-in">Log in</Link>
          </NavMenuItem>
          <NavMenuItem as="li" fontWeight="bold">
            <Link href="/create-account">Create account</Link>
          </NavMenuItem>
        </>
      )}
    </Flex>
  );
}

export default Nav;
