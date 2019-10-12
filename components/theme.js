/* eslint-disable camelcase */

import React from 'react';
import {blue, gray} from 'mineral-ui-tokens';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';

const theme = createTheme({
  colors: {
    theme: 'blue'
  },
  overrides: {
    color_theme_hover: blue[80],

    fontFamily: 'cabin'
  }
});

export default theme;

export const darkTheme = createTheme({
  colors: {
    theme: 'gray'
  },
  overrides: {
    color: 'white',
    backgroundColor: gray[100],

    fontFamily: 'cabin'
  }
});

export const DarkTheme = props => (
  <ThemeProvider theme={darkTheme} {...props} />
);
