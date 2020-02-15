import React, {FC} from 'react';
import {Styled, Box, ThemeProvider} from 'theme-ui';
import {TypeScale, TypeStyle, ColorPalette} from '@theme-ui/style-guide';
import Loading from '../components/loading';
import ServerError from '../components/server-error';

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
      <Loading />
      <ServerError />
      <ServerError error={new Error('Something went very wrong!!!')} />
    </Box>
  </ThemeProvider>
);

export default StyleGuide;
