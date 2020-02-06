/** @jsx jsx */
import {FC, useState} from 'react';
import PropTypes from 'prop-types';
import {jsx, Styled, Text, Flex} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import {motion} from 'framer-motion';

import {MenuItem} from '../queries';
import NavLink from './nav-link';

type NavCollapseProps = MenuItem;

const NavCollapse: FC<NavCollapseProps> = ({text, childpages}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Styled.p variant="prose" sx={{color: 'gray.4'}} onClick={() => setIsOpen(!isOpen)}>
        {text}
      </Styled.p>
      <Flex
        sx={{
          flexBasis: 0,
          flexDirection: 'column',
          transition: 'max-height 0.5s ease',
          height: 'auto',
          maxHeight: [isOpen ? '500px' : 0, '500px']
        }}
      >
        <Text
          as="ul"
          appearance="prose"
          sx={{
            padding: 0,
            listStyle: 'none'
          }}
        >
          {childpages.map(item => (
            <Text
              key={item._id}
              sx={{
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              <NavLink
                {...item}
                sx={{
                  color: 'gray.4',
                  '&:hover': {
                    color: 'gray.2'
                  }
                }}
              />
            </Text>
          ))}
        </Text>
      </Flex>
    </>
  );
};

NavCollapse.propTypes = {
  text: PropTypes.string.isRequired,
  childpages: PropTypes.array
};

NavCollapse.defaultProps = {
  childpages: []
};

const collapseVariants = {
  open: {flexGrow: 1, flexShrink: 0},
  closed: {flexGrow: 0, flexShrink: 1}
};

type NavItemsProps = {
  selectedMenu: string;
  menuItems: MenuItem[];
};

const NavItems: FC<NavItemsProps> = ({selectedMenu, menuItems}) => {
  const isMedium = useResponsiveValue([false, true]);

  /* eslint-disable react/jsx-no-useless-fragment */
  return (
    <>
      {menuItems.map(menu => (
        <motion.li
          key={menu._key}
          css={{
            flexBasis: isMedium ? '0' : 'auto',
            flexShrink: 1,
            flexGrow: 0,
            marginLeft: '1rem',
            marginRight: '1rem',
            overflow: 'hidden'
          }}
          animate={selectedMenu === menu.text ? 'open' : 'closed'}
          variants={collapseVariants}
          transition={{
            type: 'spring',
            damping: 40,
            stiffness: 400
          }}
        >
          <Text
            css={{
              fontWeight: 'bold',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            <NavCollapse {...menu} />
          </Text>
        </motion.li>
      ))}
    </>
  );
  /* eslint-enable react/jsx-no-useless-fragment */
};

NavItems.propTypes = {
  selectedMenu: PropTypes.string,
  menuItems: PropTypes.array.isRequired
};

NavItems.defaultProps = {
  selectedMenu: undefined
};

export default NavItems;
