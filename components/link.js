import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';
import kebabCase from 'lodash/kebabCase';

function Link({as, href, internal, ...props}) {
  if (href && internal) {
    return (
      <NextLink passHref as={as} href={href}>
        <MineralLink {...props} />
      </NextLink>
    );
  }

  return <MineralLink href={href} {...props} />;
}

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

export function hymnLinkProps({_id, title, hymnNumber}) {
  return {
    as: `/song/${_id}/${kebabCase(title)}`,
    href: '/song/[id]/[name]',
    children: `${hymnNumber}. ${title}`
  };
}

export function authorLinkProps({_id, name, dates}) {
  const fullName = `${name.first} ${name.last}`;

  return {
    as: `/author/${_id}/${kebabCase(fullName)}`,
    href: '/author/[id]/[name]',
    children: `${fullName} ${dates && `(${dates})`}`
  };
}

export function liturgyLinkProps({_id, name}) {
  return {
    as: `/rejoice/${_id}/${kebabCase(name)}`,
    href: '/rejoice/[id]/[name]',
    children: name
  };
}

export function prayerLinkProps({_id, title}) {
  return {
    as: `/pray/${_id}/${kebabCase(title)}`,
    href: '/pray/[id]/[name]',
    children: title
  };
}

export function keywordLinkProps({_id, name}) {
  return {
    as: `/keyword/${_id}/${kebabCase(name)}`,
    href: '/keyword/[id]/[name]',
    children: name
  };
}
