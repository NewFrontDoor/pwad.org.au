/** @jsx jsx */
import {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {jsx, Button, Flex, Text} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import {X} from 'react-feather';
import Link from '../link';
import {useMeQuery} from '../queries';
import {Can} from '../ability-context';
import UserAvatar from './user-avatar';

const NavMenuItem: FC = props => (
  <Text
    css={{
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '1px',
      marginLeft: '1rem',
      marginRight: '1rem'
    }}
    {...props}
  />
);

type NavProps = {
  onClose?: () => void;
  children?: ReactNode;
};

const Nav: FC<NavProps> = ({onClose, children}) => {
  const isMedium = useResponsiveValue([false, true]);
  const {data} = useMeQuery();

  return (
    <Flex
      as="ul"
      sx={{
        flex: '1 0 0%',
        padding: 0,
        justifyContent: 'space-between',
        margin: '1rem',
        flexDirection: ['column', 'column', 'row'],
        listStyle: 'none'
      }}
    >
      {!isMedium && (
        <NavMenuItem
          as="li"
          sx={{
            position: 'absolute',
            right: 0,
            marginRight: '1rem'
          }}
        >
          <Button variant="transparent" sx={{padding: 0}} onClick={onClose}>
            <X role="img" />
          </Button>
        </NavMenuItem>
      )}
      <NavMenuItem as="li" fontWeight="bold">
        <Link variant="nav" href="/">
          Home
        </Link>
      </NavMenuItem>
      {children}
      {isMedium && <li css={{marginLeft: 'auto'}} />}
      <Can I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem as="li" fontWeight="bold">
              <Link variant="nav" href="/short-list">
                Short list ({data.me.shortlist.length})
              </Link>
            </NavMenuItem>
            <NavMenuItem as="li">
              <UserAvatar />
            </NavMenuItem>
            <div>
              <Can I="read" a="keystone">
                <NavMenuItem as="li" fontWeight="bold">
                  <Link variant="nav" href="/keystone" isInternal={false}>
                    Admin
                  </Link>
                </NavMenuItem>
              </Can>
              <NavMenuItem as="li" fontWeight="bold">
                <Link variant="nav" href="/my-account">
                  My account
                </Link>
              </NavMenuItem>
              <NavMenuItem as="li" fontWeight="bold">
                <Link variant="nav" href="/api/logout">
                  Log out
                </Link>
              </NavMenuItem>
            </div>
          </>
        )}
      </Can>
      <Can not I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem as="li" fontWeight="bold">
              <Link variant="nav" href="/api/login">
                Log in
              </Link>
            </NavMenuItem>
            <NavMenuItem as="li" fontWeight="bold">
              <Link variant="nav" href="/api/login">
                Create account
              </Link>
            </NavMenuItem>
          </>
        )}
      </Can>
    </Flex>
  );
};

Nav.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node
};

Nav.defaultProps = {
  onClose: undefined,
  children: undefined
};

export default Nav;
