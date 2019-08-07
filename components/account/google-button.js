import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'mineral-ui/Button';

import Google from './google-icon';

const GoogleButton = ({children, redirectPath}) => {
  const query = new URLSearchParams();

  if (redirectPath) {
    query.set('r', redirectPath);
  }

  return (
    <Link passHref href={`/auth/google?${query}`}>
      <Button as="a" iconStart={<Google role="img" />}>
        {children}
      </Button>
    </Link>
  );
};

GoogleButton.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string
};

GoogleButton.defaultProps = {
  redirectPath: undefined
};

export default GoogleButton;
