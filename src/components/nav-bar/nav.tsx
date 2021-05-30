/** @jsx jsx */
import {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import {jsx, Styled, Button, Flex, Text} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import VisuallyHidden from '@reach/visually-hidden';
import {X} from 'react-feather';
import Link from '../link';
import useUser from '../../use-user';
import {Can} from '../ability-context';
import UserAvatar from './user-avatar';

const NavMenuItem: FC = (props) => (
  <Styled.li
    sx={{
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
  const {loggedInUser} = useUser();

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
          sx={{
            position: 'absolute',
            right: 0,
            marginRight: '1rem'
          }}
        >
          <Button variant="transparent" sx={{padding: 0}} onClick={onClose}>
            <VisuallyHidden>Close</VisuallyHidden>
            <X aria-hidden role="img" />
          </Button>
        </NavMenuItem>
      )}
      <NavMenuItem>
        <Link variant="nav" href="/">
          Home
        </Link>
      </NavMenuItem>
      {children}
      {isMedium && <li css={{marginLeft: 'auto'}} />}
      <Can I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem>
              <Link variant="nav" href="/short-list">
                Short list ({loggedInUser?.user?.shortlist?.length ?? 0})
              </Link>
            </NavMenuItem>
            <NavMenuItem>
              <UserAvatar />
            </NavMenuItem>
            <li>
              <Text variant="listNone" as="ul">
                <Can I="read" a="keystone">
                  <NavMenuItem>
                    <Link
                      variant="nav"
                      href="https://pwad.sanity.studio/"
                      isInternal={false}
                    >
                      Admin
                    </Link>
                  </NavMenuItem>
                </Can>
                <NavMenuItem>
                  <Link variant="nav" href="/my-account">
                    My account
                  </Link>
                </NavMenuItem>
                <NavMenuItem>
                  <Link variant="nav" href="/api/auth/logout">
                    Log out
                  </Link>
                </NavMenuItem>
              </Text>
            </li>
          </>
        )}
      </Can>
      <Can not I="manage" a="my-account">
        {() => (
          <>
            <NavMenuItem>
              <Link variant="nav" href="/api/auth/login">
                Log in
              </Link>
            </NavMenuItem>
            <NavMenuItem>
              <Link variant="nav" href="/api/auth/login">
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
