import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';

const Link = ({as, href, prefetch, ...props}) => (
  <NextLink passHref prefetch={prefetch} as={as} href={href}>
    <MineralLink {...props} />
  </NextLink>
);

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  prefetch: false
};

export default Link;
