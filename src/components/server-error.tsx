import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Box} from 'theme-ui';

type ServerErrorProps = {
  error?: Error;
};

const ServerError: FC<ServerErrorProps> = ({error}) => {
  return (
    <Box>
      <p>{error?.message}</p>
    </Box>
  );
};

ServerError.propTypes = {
  error: PropTypes.instanceOf(Error)
};

ServerError.defaultProps = {
  error: new Error('Something went wrong')
};

export default ServerError;
