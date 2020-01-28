/** @jsx jsx */
import {FC} from 'react';
import {jsx, Styled, Box, Grid} from 'theme-ui';
import PropTypes from 'prop-types';
import NavLink from '../nav-bar/nav-link';
import {MenuItem} from '../queries';

type FooterProps = {
  menuItems: MenuItem[];
};

const Footer: FC<FooterProps> = ({menuItems}) => {
  return (
    <footer
      sx={{
        bg: 'background'
      }}
    >
      <Box
        paddingTop="1rem"
        paddingBottom="5vh"
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
                  <Styled.p variant="prose" sx={{color: 'gray.4'}}>
                    {menu.text}
                  </Styled.p>
                )}
                {menu.childpages && (
                  <Styled.ul
                    variant="prose"
                    sx={{
                      color: 'gray.4'
                    }}
                  >
                    {menu.childpages.map(item => (
                      <li key={item._id}>
                        <NavLink
                          {...item}
                          sx={{
                            color: 'gray.4',
                            '&:hover': {
                              color: 'gray.2'
                            }
                          }}
                        />
                      </li>
                    ))}
                  </Styled.ul>
                )}
              </Box>
            ))}
          </Grid>
        )}
        <Box marginY={3}>
          <Styled.p sx={{color: 'gray.4'}}>
            © 2007 - 2018 PWAD & the Presbyterian Church of Australia
          </Styled.p>
        </Box>
      </Box>
    </footer>
  );
};

Footer.propTypes = {
  menuItems: PropTypes.array.isRequired
};

export default Footer;
