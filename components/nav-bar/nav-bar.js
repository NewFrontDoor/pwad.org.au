/** @jsx jsx */
import {useState, useEffect} from 'react';
import {jsx, css} from '@emotion/core';
import {useQuery} from '@apollo/react-hooks';
import {motion} from 'framer-motion';
import Flex from 'mineral-ui/Flex';
import Text from 'mineral-ui/Text';
import Button from 'mineral-ui/Button';
import styled from '@emotion/styled';
import {useMediumMedia} from '../use-media';
import {Can} from '../ability-context';
import {darkTheme, DarkTheme} from '../theme';

import Link from '../link';
import useToggle from '../use-toggle';
import {MENUS} from '../queries';
import Nav from './nav';
import NavOverlay from './nav-overlay';
import NavItems from './nav-items';

const NavMenuItem = styled(Text)({
  letterSpacing: '1px',
  textTransform: 'uppercase'
});

const MenuButton = styled(Button)({
  backgroundColor: 'white',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  fontWeight: 'inherit',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer'
});

const mobileOverlayVariants = {
  open: {height: '100vh'},
  closed: {height: '1rem'}
};

const desktopOverlayVariants = {
  open: {height: '33vh'},
  closed: {height: 0}
};

function NavBar() {
  const isMedium = useMediumMedia();
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isOpen, toggleOpen] = useToggle(false);
  const {data: {menuMany} = {}} = useQuery(MENUS);

  useEffect(() => {
    // If nav bar is open on mobile, disable scroll
    document.body.style.overflowY = isOpen && !isMedium ? 'hidden' : '';
  }, [isMedium, isOpen]);

  return (
    <>
      <NavOverlay onClickOutside={() => isOpen && toggleOpen()}>
        <DarkTheme>
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={isMedium ? desktopOverlayVariants : mobileOverlayVariants}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400
            }}
            css={css`
              z-index: 1;
              position: absolute;
              top: 0;
              height: 0;
              padding-top: 1rem;
              overflow: ${isOpen ? 'scroll' : 'hidden'};
              background-color: ${darkTheme.backgroundColor};
            `}
          >
            {isMedium ? (
              menuMany && (
                <Flex
                  as="ul"
                  breakpoints={['narrow']}
                  width={['auto', 3 / 4]}
                  marginHorizontal={['md', 'auto']}
                >
                  <NavItems selectedMenu={selectedMenu} menuItems={menuMany} />
                </Flex>
              )
            ) : (
              <Nav onClose={toggleOpen}>
                {menuMany && (
                  <NavItems selectedMenu={selectedMenu} menuItems={menuMany} />
                )}
              </Nav>
            )}
          </motion.div>
        </DarkTheme>
      </NavOverlay>
      <Flex
        as="nav"
        marginHorizontal="auto"
        width="100%"
        alignItems="center"
        justifyContent="between"
      >
        {isMedium ? (
          <Nav>
            {menuMany &&
              menuMany.map(({_id, name}) => (
                <NavMenuItem key={_id} as="li">
                  <Button
                    minimal
                    onClick={() => {
                      toggleOpen();
                      setSelectedMenu(name);
                    }}
                  >
                    {name}
                  </Button>
                </NavMenuItem>
              ))}
          </Nav>
        ) : (
          <>
            <MenuButton minimal onClick={toggleOpen}>
              Menu
            </MenuButton>
            <Can I="read" a="my-account">
              <Link href="/my-account">My account</Link>
            </Can>
          </>
        )}
      </Flex>
    </>
  );
}

export default NavBar;
