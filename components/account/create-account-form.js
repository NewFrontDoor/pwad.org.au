import React from 'react';
import PropTypes from 'prop-types';

import GoogleButton from './google-button';

const CreateAccountForm = ({redirectPath, location}) => {
  return (
    <GoogleButton redirectPath={redirectPath} location={location}>
      Signup with Google
    </GoogleButton>
  );
};

CreateAccountForm.propTypes = {
  redirectPath: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

CreateAccountForm.defaultProps = {
  redirectPath: undefined,
  location: undefined
};

export default CreateAccountForm;
