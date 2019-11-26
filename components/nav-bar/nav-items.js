/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Text from 'mineral-ui/Text';
import {motion} from 'framer-motion';

import Link from '../link';
import {useMediumMedia} from '../use-media';
import NavLink from './nav-link';

const noList = css`
  padding: 0;
  list-style: none;
`;

const NavMenuItem = styled(Text)({
  letterSpacing: '1px',
  textTransform: 'uppercase'
});

function NavCollapse({text, childpages}) {
  return (
    <>
      <Text appearance="prose">{text}</Text>
      <div
        css={css`
          display: flex;
          flex-basis: 0;
          flex-direction: column;
        `}
      >
        <Text as="ul" appearance="prose" css={noList}>
          {childpages.map(item => (
            <NavMenuItem key={item._id}>
              <NavLink {...item} />
            </NavMenuItem>
          ))}
        </Text>
      </div>
    </>
  );
}

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

function NavItems({selectedMenu, menuItems}) {
  const isMedium = useMediumMedia();

  return (
    <>
      {menuItems.map(menu =>
        menu.link ? (
          <NavMenuItem key={menu._id} as="li" fontWeight="bold">
            <Link href="/content/[page]" as={`/content/${menu.link.key}`}>
              {menu.link.name}
            </Link>
          </NavMenuItem>
        ) : (
          <motion.li
            key={menu._id}
            css={css`
              flex-basis: ${isMedium ? '0' : 'auto'};
              flex-shrink: 1;
              flex-grow: 0;
              margin-left: 1rem;
              margin-right: 1rem;
              overflow: hidden;
            `}
            animate={selectedMenu === menu.name ? 'open' : 'closed'}
            variants={collapseVariants}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400
            }}
          >
            <NavMenuItem fontWeight="bold">
              <NavCollapse {...menu} />
            </NavMenuItem>
          </motion.li>
        )
      )}
    </>
  );
}

NavItems.propTypes = {
  selectedMenu: PropTypes.string,
  menuItems: PropTypes.array.isRequired
};

NavItems.defaultProps = {
  selectedMenu: undefined
};

export default NavItems;
