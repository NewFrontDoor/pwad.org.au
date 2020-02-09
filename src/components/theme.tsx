import React, {FC} from 'react';
import {ThemeProvider} from 'theme-ui';

const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      'cabin, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace'
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    primary: '#2a51d3',
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    text: '#333840',
    background: '#333840',
    gray: [
      null,
      '#f7fafc',
      '#edf2f7',
      '#e2e8f0',
      '#cbd5e0',
      '#a0aec0',
      '#718096',
      '#4a5568',
      '#2d3748',
      '#1a202c'
    ],
    red: [
      null,
      '#fff5f5',
      '#fed7d7',
      '#feb2b2',
      '#fc8181',
      '#f56565',
      '#e53e3e',
      '#c53030',
      '#9b2c2c',
      '#742a2a'
    ],
    orange: [
      null,
      '#fffaf0',
      '#feebc8',
      '#fbd38d',
      '#f6ad55',
      '#ed8936',
      '#dd6b20',
      '#c05621',
      '#9c4221',
      '#7b341e'
    ],
    yellow: [
      null,
      '#fffff0',
      '#fefcbf',
      '#faf089',
      '#f6e05e',
      '#ecc94b',
      '#d69e2e',
      '#b7791f',
      '#975a16',
      '#744210'
    ],
    green: [
      null,
      '#f0fff4',
      '#c6f6d5',
      '#9ae6b4',
      '#68d391',
      '#48bb78',
      '#38a169',
      '#2f855a',
      '#276749',
      '#22543d'
    ],
    teal: [
      null,
      '#e6fffa',
      '#b2f5ea',
      '#81e6d9',
      '#4fd1c5',
      '#38b2ac',
      '#319795',
      '#2c7a7b',
      '#285e61',
      '#234e52'
    ],
    blue: [
      null,
      '#ebf8ff',
      '#bee3f8',
      '#90cdf4',
      '#63b3ed',
      '#4299e1',
      '#3182ce',
      '#2b6cb0',
      '#2c5282',
      '#2a4365'
    ],
    indigo: [
      null,
      '#ebf4ff',
      '#c3dafe',
      '#a3bffa',
      '#7f9cf5',
      '#667eea',
      '#5a67d8',
      '#4c51bf',
      '#434190',
      '#3c366b'
    ],
    purple: [
      null,
      '#faf5ff',
      '#e9d8fd',
      '#d6bcfa',
      '#b794f4',
      '#9f7aea',
      '#805ad5',
      '#6b46c1',
      '#553c9a',
      '#44337a'
    ],
    pink: [
      null,
      '#fff5f7',
      '#fed7e2',
      '#fbb6ce',
      '#f687b3',
      '#ed64a6',
      '#d53f8c',
      '#b83280',
      '#97266d',
      '#702459'
    ]
  },
  buttons: {
    primary: {
      color: 'white',
      background: 'primary',
      cursor: 'pointer'
    },
    transparent: {
      color: 'primary',
      background: 'none',
      cursor: 'pointer',
      border: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  links: {
    bold: {
      fontWeight: 'bold'
    },
    nav: {
      color: 'inherit',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  cards: {
    primary: {
      padding: 3,
      borderRadius: 4,
      background: 'white',
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)'
    }
  },
  text: {
    listStandard: {
      listStyle: 'disc',
      paddingInlineStart: '20px'
    },
    listFlat: {
      listStyle: 'none',
      paddingInlineStart: '0'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
      marginBottom: 3
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
      marginBottom: 3
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
      marginBottom: 2
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
      marginBottom: 2
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
      marginBottom: 1
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
      marginBottom: 1
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body'
    },
    a: {
      color: 'primary',
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    img: {
      maxWidth: '100%'
    },
    ul: {
      listStyle: 'disc',
      paddingInlineStart: '20px'
    }
  }
};

export default theme;

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: theme.colors.gray[4],
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
    text: theme.colors.gray[4]
  },
  styles: {
    ...theme.styles,
    footer: {
      bg: 'background',
      color: 'gray.4'
    }
  }
};

export const DarkTheme: FC = props => (
  <ThemeProvider {...props} theme={darkTheme} />
);
