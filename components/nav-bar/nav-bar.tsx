/** @jsx jsx */
import {FC, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {jsx, Flex, Box, Styled, Button} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import {motion} from 'framer-motion';
import {Can} from '../ability-context';

import {MenuItem} from '../queries';
import Link from '../link';
import useToggle from '../use-toggle';
import Nav from './nav';
import NavOverlay from './nav-overlay';
import NavItems from './nav-items';

const mobileOverlayVariants = {
  open: {height: '100vh'},
  closed: {height: '1rem'}
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
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isOpen, toggleOpen] = useToggle(false);

  useEffect(() => {
    // If nav bar is open on mobile, disable scroll
    document.body.style.overflowY = isOpen && !isMedium ? 'hidden' : '';
  }, [isMedium, isOpen]);

  return (
    <>
      <NavOverlay onClickOutside={() => isOpen && toggleOpen()}>
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
            paddingTop: '1rem',
            width: '100%',
            overflow: isOpen ? 'scroll' : 'hidden'
          }}
        >
          <Box
            sx={{
              bg: 'background'
            }}
          >
            {isMedium ? (
              menuItems && (
                <Flex
                  as="ul"
                  marginX={[4, 'auto']}
                  sx={{
                    width: ['auto', '75%']
                  }}
                >
                  <NavItems
                    selectedMenu={selectedMenu}
                    menuItems={menuItems}
                    onNavigate={() => isOpen && toggleOpen()}
                  />
                </Flex>
              )
            ) : (
              <Nav onClose={toggleOpen}>
                {menuItems && (
                  <NavItems selectedMenu={selectedMenu} menuItems={menuItems} />
                )}
              </Nav>
            )}
          </Box>
        </motion.div>
      </NavOverlay>
      <Flex
        as="nav"
        marginX="auto"
        alignItems="center"
        justifyContent="between"
        sx={{
          width: '100%'
        }}
      >
        {isMedium ? (
          <Nav>
            {menuItems.map(({_key, text}) => (
              <Styled.li
                key={_key}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
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
                backgroundColor: 'white',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
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
              <Link href="/my-account">My account</Link>
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
