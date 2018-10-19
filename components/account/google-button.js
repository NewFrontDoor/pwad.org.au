import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import getConfig from 'next/config';
import queryString from 'query-string';
import Button from 'mineral-ui/Button';

import Google from './google-icon';

const {publicRuntimeConfig} = getConfig();

const GoogleButton = ({children, redirectPath, location}) => {
  let r;

  if (location) {
    const searchObj = queryString.parse(location.search);
    r = searchObj.r;
  }

  const postAuthRedirectPath =
    redirectPath !== undefined || r !== undefined
      ? `?r=${redirectPath || r}`
      : `?r=${publicRuntimeConfig.hostUrl}`;

  return (
    <Link passHref href={`/auth/google${postAuthRedirectPath}`}>
      <Button element="a" iconStart={<Google role="img" />}>
        {children}
      </Button>
    </Link>
  );
};

GoogleButton.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

GoogleButton.defaultProps = {
  redirectPath: undefined,
  location: undefined
};

export default GoogleButton;
