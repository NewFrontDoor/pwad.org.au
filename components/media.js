import React from 'react';
import Media from 'react-media';
import {withTheme} from 'mineral-ui/themes';

export default withTheme(({query, theme, ...props}) => {
  const breakpoint = `breakpoint_${query}`;
  return <Media query={`(min-width: ${theme[breakpoint]})`} {...props} />;
});
