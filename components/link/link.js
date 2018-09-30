import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';

const Link = ({as, href, ...props}) => (
  <NextLink passHref as={as} href={href}>
    <MineralLink {...props}/>
  </NextLink>
);

Link.defaultProps = {
  as: undefined
};

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string.isRequired
};

export default Link;
