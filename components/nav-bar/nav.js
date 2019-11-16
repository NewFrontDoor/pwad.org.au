/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx, css} from '@emotion/core';
import {useQuery} from '@apollo/react-hooks';
import Button from 'mineral-ui/Button';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import styled from '@emotion/styled';
import {X} from 'react-feather';
import {useMediumMedia} from '../use-media';
import Link from '../link';
import {ME} from '../queries';
import {Can} from '../ability-context';
import UserAvatar from './user-avatar';

const noList = css`
  flex: 1 0 0%;
  padding: 0;
  list-style: none;
`;

const NavMenuItem = styled(Text)({
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  marginLeft: '1rem',
  marginRight: '1rem'
});

const Spacer = styled('li')({
  marginLeft: 'auto'
});

function Nav({onClose, children}) {
  const isMedium = useMediumMedia();
  const {data: {me} = {}} = useQuery(ME);

  return (
    <Flex
      as="ul"
      justifyContent="between"
      css={noList}
      marginHorizontal="1rem"
      breakpoints={['narrow', 'medium']}
      direction={['column', 'column', 'row']}
    >
      {!isMedium && (
        <NavMenuItem
          as="li"
          css={css`
            position: absolute;
            right: 0;
            margin-right: 1rem;
          `}
        >
          <Button minimal iconStart={<X role="img" />} onClick={onClose} />
        </NavMenuItem>
      )}
      <NavMenuItem as="li" fontWeight="bold">
        <Link href="/" onClick={onClose}>
          Home
        </Link>
      </NavMenuItem>
      {children}
      {isMedium && <Spacer />}
      <Can I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem as="li" fontWeight="bold">
              <Link href="/auth/logout">Log out</Link>
            </NavMenuItem>
            <NavMenuItem as="li" fontWeight="bold">
              <Link href="/short-list">Short list ({me.shortlist.length})</Link>
            </NavMenuItem>
            {isMedium && (
              <>
                <Can I="read" a="keystone">
                  <NavMenuItem as="li" fontWeight="bold">
                    <Link href="/keystone" isInternal={false}>
                      Admin
                    </Link>
                  </NavMenuItem>
                </Can>
                <NavMenuItem as="li" fontWeight="bold">
                  <Link href="/my-account">My account</Link>
                </NavMenuItem>
              </>
            )}
            <NavMenuItem as="li">
              <UserAvatar />
            </NavMenuItem>
          </>
        )}
      </Can>
      <Can not I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem as="li" fontWeight="bold">
              <Link href="/sign-in">Log in</Link>
            </NavMenuItem>
            <NavMenuItem as="li" fontWeight="bold">
              <Link href="/create-account">Create account</Link>
            </NavMenuItem>
          </>
        )}
      </Can>
    </Flex>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Nav;
