/** @jsx jsx */
import {FC} from 'react';
import PropTypes from 'prop-types';
import {jsx, Styled, Text, Flex} from 'theme-ui';
import {useResponsiveValue} from '@theme-ui/match-media';
import {motion} from 'framer-motion';

import {MenuItem} from '../queries';
import Link from '../link';
import NavLink from './nav-link';

type NavCollapseProps = MenuItem;

const NavCollapse: FC<NavCollapseProps> = ({text, childpages}) => {
  return (
    <>
      <Styled.p variant="prose">{text}</Styled.p>
      <Flex
        css={{
          flexBasis: 0,
          flexDirection: 'column'
        }}
      >
        <Text
          as="ul"
          appearance="prose"
          css={{
            padding: 0,
            listStyle: 'none'
          }}
        >
          {childpages.map(item => (
            <Text
              key={item._id}
              css={{
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              <NavLink {...item} />
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

  return (
    <>
      {menuItems.map(menu =>
        menu.link ? (
          <Text
            key={menu._key}
            as="li"
            fontWeight="bold"
            css={{
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            <Link href="/content/[page]" as={`/content/${menu.link.key}`}>
              {menu.link.name}
            </Link>
          </Text>
        ) : (
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
            animate={selectedMenu === menu.name ? 'open' : 'closed'}
            variants={collapseVariants}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400
            }}
          >
            <Text
              fontWeight="bold"
              css={{
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              <NavCollapse {...menu} />
            </Text>
          </motion.li>
        )
      )}
    </>
  );
};

NavItems.propTypes = {
  selectedMenu: PropTypes.string,
  menuItems: PropTypes.array.isRequired
};

NavItems.defaultProps = {
  selectedMenu: undefined
};

export default NavItems;
