/** @jsx jsx */
import {FC, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import {jsx, Flex, Box, Styled, Button, useThemeUI} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import {motion} from 'framer-motion';
import {Can} from '../ability-context';

import {DarkTheme} from '../theme';

import {MenuItem} from '../../../queries/_types';
import Link from '../link';
import useToggle from '../use-toggle';
import Nav from './nav';
import NavOverlay from './nav-overlay';
import NavItems from './nav-items';

const mobileOverlayVariants = {
  open: {height: '100vh'},
  closed: {height: 0}
};

const desktopOverlayVariants = {
  open: {height: '33vh'},
  closed: {height: 0}
};

type NavBarProps = {
  menuItems: MenuItem[];
};

const NavBar: FC<NavBarProps> = ({menuItems}) => {
  const isMedium = useResponsiveValue([false, true]);
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isOpen, toggleOpen] = useToggle(false);
  const {theme} = useThemeUI();

  useEffect(() => {
    const handleRouteChange = () => {
      toggleOpen(false);
    };

    Router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [isOpen, toggleOpen]);

  useEffect(() => {
    // If nav bar is open on mobile, disable scroll
    document.body.style.overflowY = isOpen && !isMedium ? 'hidden' : '';
  }, [isMedium, isOpen]);

  return (
    <>
      <DarkTheme>
        <NavOverlay
          onClickOutside={() => {
            toggleOpen(false);
          }}
        >
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={isMedium ? desktopOverlayVariants : mobileOverlayVariants}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400
            }}
            css={{
              zIndex: 1,
              position: 'absolute',
              top: 0,
              height: 0,
              width: '100%',
              overflow: isOpen ? 'scroll' : 'hidden',
              background: theme.colors.background
            }}
          >
            <Box sx={{color: 'text'}}>
              {isMedium ? (
                menuItems && (
                  <Flex
                    as="ul"
                    sx={{
                      marginX: [4, 'auto'],
                      width: ['auto', '75%']
                    }}
                  >
                    <NavItems
                      selectedMenu={selectedMenu}
                      menuItems={menuItems}
                    />
                  </Flex>
                )
              ) : (
                <Nav
                  onClose={() => {
                    toggleOpen(false);
                  }}
                >
                  {menuItems && (
                    <NavItems
                      selectedMenu={selectedMenu}
                      menuItems={menuItems}
                    />
                  )}
                </Nav>
              )}
            </Box>
          </motion.div>
        </NavOverlay>
      </DarkTheme>
      <Flex
        as="nav"
        sx={{
          marginX: 'auto',
          marginTop: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          color: 'primary'
        }}
      >
        {isMedium ? (
          <Nav>
            {menuItems.map(({_key, text}) => (
              <Styled.li
                key={_key}
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Button
                  variant="transparent"
                  sx={{
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                  onClick={() => {
                    toggleOpen();
                    setSelectedMenu(text);
                  }}
                >
                  {text}
                </Button>
              </Styled.li>
            ))}
          </Nav>
        ) : (
          <>
            <Button
              variant="transparent"
              css={{
                letterSpacing: 'inherit',
                textTransform: 'uppercase',
                fontWeight: 'inherit',
                margin: '0',
                padding: '0',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={toggleOpen}
            >
              Menu
            </Button>
            <Can I="read" a="my-account">
              <Link variant="nav" href="/my-account">
                My account
              </Link>
            </Can>
          </>
        )}
      </Flex>
    </>
  );
};

NavBar.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export default NavBar;
