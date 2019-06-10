import React from 'react';
import Box from 'mineral-ui/Box';

function ContentWrap(props) {
  return (
    <Box
      breakpoints={['narrow']}
      width={['auto', '35em']}
      marginHorizontal={['md', 'auto']}
      {...props}
    />
  );
}

export default ContentWrap;
