import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';

const Link = ({as, href, ...props}) => {
  if (href) {
    return (
      <NextLink passHref as={as} href={href}>
        <MineralLink {...props} />
      </NextLink>
    );
  }

  return <MineralLink {...props} />;
};

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string
};

Link.defaultProps = {
  as: undefined,
  href: undefined
};

export default Link;
