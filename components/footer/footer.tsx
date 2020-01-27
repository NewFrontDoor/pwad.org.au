/** @jsx jsx */
import {FC} from 'react';
import {jsx, Styled, Box, Grid} from 'theme-ui';
import PropTypes from 'prop-types';
import {DarkTheme} from '../theme';
import NavLink from '../nav-bar/nav-link';
import {MenuItem} from '../queries';

type FooterProps = {
  menuItems: MenuItem[];
};

const Footer: FC<FooterProps> = ({menuItems}) => {
  return (
    <DarkTheme>
      <Box bg="background">
        <Box
          as="footer"
          paddingTop="1rem"
          paddingBottom="15vh"
          marginX={[3, 'auto']}
          sx={{
            width: ['auto', '75%']
          }}
        >
          {menuItems && (
            <Grid columns={[1, 2, 5]}>
              {menuItems.map(menu => (
                <Box key={menu._key}>
                  {menu.text && (
                    <Styled.p variant="prose">{menu.text}</Styled.p>
                  )}
                  {menu.childpages && (
                    <Styled.p variant="prose" as="ul">
                      {menu.childpages.map(item => (
                        <li key={item._id}>
                          <NavLink {...item} />
                        </li>
                      ))}
                    </Styled.p>
                  )}
                </Box>
              ))}
            </Grid>
          )}
          <Box marginY={3}>
            <Styled.p>
              © 2007 - 2018 PWAD & the Presbyterian Church of Australia
            </Styled.p>
          </Box>
        </Box>
      </Box>
    </DarkTheme>
  );
};

Footer.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export default Footer;
