import React, {FC} from 'react';
import {Box} from 'theme-ui';

const ContentWrap: FC = (props) => {
  return (
    <Box
      marginX={[4, 'auto']}
      sx={{
        width: ['auto', '50em']
      }}
      {...props}
    />
  );
};

export default ContentWrap;
