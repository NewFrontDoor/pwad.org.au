import React from 'react';
import PropTypes from 'prop-types';
import {rem} from 'polished';
import {Query} from 'react-apollo';
import Flex from 'mineral-ui/Flex';
import Button from 'mineral-ui/Button';
import Popover from 'mineral-ui/Popover';
import {createThemedComponent, withTheme} from 'mineral-ui/themes';
import {createStyledComponent} from 'mineral-ui/styles';
import Media from '../media';

import Link from '../link';
import {ME} from '../queries';
import Nav from './nav';

const MenuButton = createStyledComponent(Button, {
  backgroundColor: 'white',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
  fontWeight: 'inherit',
  margin: '0',
  padding: '0',
  border: 'none',
  cursor: 'pointer'
});

const Root = createStyledComponent('div', ({isMenuOpen, menuHeight, theme}) => {
  const transitionProperties = '350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  return {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: isMenuOpen
      ? rem(300) // Dependent on menu height
      : theme.baseline_7,
    paddingTop: rem(30), // matches horizontal padding
    transition: `margin ${transitionProperties}`,

    '& div[id$="popover"] div[id$="content"]': {
      // Matches nav link padding + menuButton optical adjustment
      marginTop: `${parseFloat(theme.space_stack_sm) + 0.45}em`,
      opacity: isMenuOpen ? 1 : 0,
      transition: `opacity 500ms linear`,

      // CardBlock (tried doing this via theme variables, and it didn't work)
      '& > div': {
        margin: 0,
        padding: 0
      }
    },

    [theme.breakpoint_home_navExpanded]: {
      marginBottom: theme.baseline_9,
      paddingTop: theme.baseline_2
    }
  };
});

const popoverTheme = {
  PopoverContent_backgroundColor: null,
  PopoverContent_borderColor: 'transparent',
  PopoverContent_borderRadius: null,
  PopoverContent_boxShadow: null,
  PopoverContent_paddingVertical: null
};

const MenuPopover = createThemedComponent(Popover, popoverTheme);

const toggleMenu = ({isMenuOpen}) => ({
  isMenuOpen: !isMenuOpen
});

class NavBar extends React.Component {
  state = {
    isMenuOpen: false,
    menuHeight: null
  };

  menuRef = React.createRef();

  handleMenuClick = () => {
    this.setState(toggleMenu);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMenuOpen && !prevState.isMenuOpen) {
      const {current} = this.menuRef;
      const {height: menuHeight} = current.getBoundingClientRect();
      this.setState({menuHeight});
    }
  }

  render() {
    const {theme} = this.props;
    const {isMenuOpen, menuHeight} = this.state;

    return (
      <Root isMenuOpen={isMenuOpen} menuHeight={menuHeight} theme={theme}>
        <Flex
          element="nav"
          breakpoints={['narrow', 'medium']}
          paddingVertical={['0', '0', '5vh']}
          marginHorizontal="auto"
          width="100%"
          alignItems="center"
          justifyContent="between"
        >
          <Media query="medium">
            {matches =>
              matches ? (
                <Nav />
              ) : (
                <>
                  <MenuPopover
                    content={
                      <div ref={this.menuRef}>
                        <Nav />
                      </div>
                    }
                    hasArrow={false}
                    isOpen={isMenuOpen}
                    modifiers={{
                      preventOverflow: {
                        padding: 0
                      }
                    }}
                    placement="bottom-end"
                    onClose={this.handleMenuClick}
                    onOpen={this.handleMenuClick}
                  >
                    <MenuButton minimal>Menu</MenuButton>
                  </MenuPopover>
                  <Query query={ME}>
                    {({data}) => {
                      if (data.me) {
                        return (
                          <Link prefetch href="/my-account">
                            My account
                          </Link>
                        );
                      }

                      return null;
                    }}
                  </Query>
                </>
              )
            }
          </Media>
        </Flex>
      </Root>
    );
  }
}

NavBar.propTypes = {
  theme: PropTypes.shape({
    breakpoint_medium: PropTypes.string
  }).isRequired
};

export default withTheme(NavBar);
