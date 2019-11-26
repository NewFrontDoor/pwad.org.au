import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import MineralLink from 'mineral-ui/Link';
import kebabCase from 'lodash/kebabCase';

function Link({as, href, isInternal, ...props}) {
  if (href && isInternal) {
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
  isInternal: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  href: undefined,
  isInternal: true
};

export default Link;

export function hymnLinkProps({_id, title, hymnNumber}) {
  return {
    as: `/rejoice/${_id}/${kebabCase(title)}`,
    href: '/rejoice/[id]/[name]',
    children: `${hymnNumber}. ${title}`
  };
}

export function authorLinkProps({_id, name, dates}) {
  let fullName = name;

  if (typeof fullName === 'object') {
    fullName = `${name.first} ${name.last}`;
  }

  return {
    as: `/author/${_id}/${kebabCase(fullName)}`,
    href: '/author/[id]/[name]',
    children: `${fullName} ${dates && `(${dates})`}`
  };
}

export function liturgyLinkProps({_id, title}) {
  return {
    as: `/worship/${_id}/${kebabCase(title)}`,
    href: '/worship/[id]/[name]',
    children: title
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
