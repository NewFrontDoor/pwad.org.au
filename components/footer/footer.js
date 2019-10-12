/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import Text from 'mineral-ui/Text';
import Box from 'mineral-ui/Box';
import Grid, {GridItem} from 'mineral-ui/Grid';
import {useQuery} from '@apollo/react-hooks';
import {MENUS} from '../queries';
import Link from '../link';
import {darkTheme, DarkTheme} from '../theme';
import NavLink from '../nav-bar/nav-link';

function Footer() {
  const {data: {menuMany} = {}} = useQuery(MENUS);

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
          {menuMany && (
            <Grid breakpoints={['medium', 'wide']}>
              {menuMany.map(menu => (
                <GridItem key={menu._id} span={[12, 6, 3]}>
                  {menu.name && <Text appearance="prose">{menu.name}</Text>}
                  {menu.link ? (
                    <Link
                      href="/content/[page]"
                      as={`/content/${menu.link.key}`}
                    >
                      {menu.link.name}
                    </Link>
                  ) : (
                    <>
                      <Text appearance="prose" as="ul">
                        {menu.resources.map(item => (
                          <li key={item._id}>
                            <NavLink {...item} />
                          </li>
                        ))}
                      </Text>
                    </>
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

export default Footer;
