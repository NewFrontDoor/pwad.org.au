/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Grid, {GridItem} from 'mineral-ui/Grid';
import Link from '../link';
import {darkTheme, DarkTheme} from '../theme';
import NavLink from '../nav-bar/nav-link';

function Footer({menuItems}) {
  return (
    <DarkTheme>
      <Box
        css={css`
          background: ${darkTheme.backgroundColor};
        `}
      >
        <Box
          as="footer"
          paddingTop="1rem"
          paddingBottom="15vh"
          breakpoints={['narrow']}
          width={['auto', 3 / 4]}
          marginHorizontal={['md', 'auto']}
        >
          {menuItems && (
            <Grid breakpoints={['medium', 'wide']}>
              {menuItems.map(menu => (
                <GridItem key={menu._key} span={[12, 6, 3]}>
                  {menu.text && <Text appearance="prose">{menu.text}</Text>}
                  {menu.link && (
                    <Link
                      href="/content/[page]"
                      as={`/content/${menu.link.key}`}
                    >
                      {menu.link.text}
                    </Link>
                  )}
                  {menu.childpages && (
                    <Text appearance="prose" as="ul">
                      {menu.childpages.map(item => (
                        <li key={item._key}>
                          <NavLink {...item} />
                        </li>
                      ))}
                    </Text>
                  )}
                </GridItem>
              ))}
            </Grid>
          )}
          <Text>© 2007 - 2018 PWAD & the Presbyterian Church of Australia</Text>
        </Box>
      </Box>
    </DarkTheme>
  );
}

Footer.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export default Footer;
