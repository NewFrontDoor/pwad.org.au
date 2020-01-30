import React, {FC} from 'react';
import {Styled, Box, ThemeProvider} from 'theme-ui';
import {TypeScale, TypeStyle, ColorPalette} from '@theme-ui/style-guide';

import theme from '../components/theme';

const StyleGuide: FC = () => (
  <ThemeProvider theme={theme}>
    <Box margin="3" padding="3" sx={{bg: 'white'}}>
      <Styled.h1>Style Guide</Styled.h1>
      <ColorPalette />
      <TypeScale />
      <TypeStyle
        fontFamily="heading"
        fontWeight="heading"
        lineHeight="heading"
      />
      <TypeStyle fontFamily="body" fontWeight="body" lineHeight="body" />
    </Box>
  </ThemeProvider>
);

export default StyleGuide;
