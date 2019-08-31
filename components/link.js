import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';

const Link = ({as, href, internal, ...props}) => {
  if (href && internal) {
    return (
      <NextLink passHref as={as} href={href}>
        <MineralLink {...props} />
      </NextLink>
    );
  }

  return <MineralLink href={href} {...props} />;
};

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  internal: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  href: undefined,
  internal: true
};

export default Link;
