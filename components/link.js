import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';

const Link = ({as, href, prefetch, ...props}) => {
  if (href) {
    return (
      <NextLink passHref prefetch={prefetch} as={as} href={href}>
        <MineralLink {...props} />
      </NextLink>
    );
  }

  return <MineralLink {...props} />;
};

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  prefetch: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  href: undefined,
  prefetch: false
};

export default Link;
