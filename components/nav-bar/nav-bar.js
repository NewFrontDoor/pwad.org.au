/* eslint-disable camelcase */

import React, {useReducer, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {rem} from 'polished';
import Flex from 'mineral-ui/Flex';
import Button from 'mineral-ui/Button';
import Popover from 'mineral-ui/Popover';
import {themed} from 'mineral-ui/themes';
import styled from '@emotion/styled';
import {withTheme} from 'emotion-theming';
import {useMediumMedia} from '../use-media';
import {Can} from '../ability-context';

import Link from '../link';
import Nav from './nav';

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

const Root = styled('div')(({isMenuOpen, theme}) => {
  const transitionProperties = '350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)';

  return {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: isMenuOpen
      ? rem(300) // Dependent on menu height
      : theme.baseline_7,
    paddingTop: rem(30), // Matches horizontal padding
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

const MenuPopover = themed(Popover)(popoverTheme);

const initialState = {
  isMenuOpen: false,
  menuHeight: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'toggle-menu':
      return {...state, isMenuOpen: !state.isMenuOpen};
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function NavBar({theme}) {
  const menuRef = useRef(null);
  const [{isMenuOpen, menuHeight}, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    // If (this.state.isMenuOpen && !prevState.isMenuOpen) {
    //   const {current} = this.menuRef;
    //   const {height: menuHeight} = current.getBoundingClientRect();
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({menuHeight});
    // }
  });

  const isMedium = useMediumMedia();

  return (
    <Root isMenuOpen={isMenuOpen} menuHeight={menuHeight} theme={theme}>
      <Flex
        as="nav"
        breakpoints={['narrow', 'medium']}
        paddingVertical={['0', '0', '5vh']}
        marginHorizontal="auto"
        width="100%"
        alignItems="center"
        justifyContent="between"
      >
        {isMedium ? (
          <Nav />
        ) : (
          <>
            <MenuPopover
              content={
                <div ref={menuRef}>
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
              onClose={() => dispatch({type: 'toggle-menu'})}
              onOpen={() => dispatch({type: 'toggle-menu'})}
            >
              <MenuButton minimal>Menu</MenuButton>
            </MenuPopover>
            <Can I="read" a="my-account">
              <Link href="/my-account">My account</Link>
            </Can>
          </>
        )}
      </Flex>
    </Root>
  );
}

NavBar.propTypes = {
  theme: PropTypes.shape({
    breakpoint_medium: PropTypes.string
  }).isRequired
};

export default withTheme(NavBar);
