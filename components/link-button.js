/* eslint-disable camelcase */

import React from 'react';
import {createStyledComponent} from 'mineral-ui/styles';
import {ThemeProvider, withTheme} from 'mineral-ui/themes';
import Button from 'mineral-ui/Button';

const LinkButton = createStyledComponent(Button, ({appearance, theme}) => {
  return {
    padding: 0,
    border: 'none',
    background: 'none',
    lineHeight:
      appearance === 'prose' ? theme.lineHeight_prose : theme.lineHeight,
    fontWeight: 'inherit',
    textTransform: 'inherit',
    backgroundColor: 'transparent',

    '&:active': {
      color: theme.color_theme_active
    },

    '&:focus': {
      textDecoration: 'underline',
      outline: `1px solid ${theme.color_theme_active}`
    },

    '&:active, &:focus': {
      background: 'transparent',
      boxShadow: 'none'
    },

    '&:hover': {
      color: theme.color_theme_active,
      textDecoration: 'underline',
      background: 'transparent'
    }
  };
});

export default withTheme(({appearance, theme, ...props}) => {
  const fontSize_ui =
    appearance === 'prose' ? theme.fontSize_prose : theme.fontSize_ui;

  return (
    <ThemeProvider theme={{fontSize_ui}}>
      <LinkButton {...props} />
    </ThemeProvider>
  );
});
