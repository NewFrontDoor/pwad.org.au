import React from 'react';
import Media from 'react-media';
import {withTheme} from 'mineral-ui/themes';

export default withTheme(({query, theme, ...props}) => (
  <Media query={theme[query]} {...props} />
));
