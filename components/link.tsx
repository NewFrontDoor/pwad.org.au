import React, {ReactNode, FC} from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {Link as ThemeUiLink} from 'theme-ui';
import kebabCase from 'lodash/kebabCase';
import {Author, Hymn, Prayer, Keyword, Liturgy, SearchResult} from './queries';

type LinkProps = {
  as?: string;
  href?: string;
  onClick?: () => void;
  isInternal?: boolean;
  children?: ReactNode;
} & Record<string, unknown>;

const Link: FC<LinkProps> = ({as, href, isInternal, ...props}) => {
  if (href && isInternal) {
    return (
      <NextLink passHref as={as} href={href}>
        <ThemeUiLink {...props} />
      </NextLink>
    );
  }

  return <ThemeUiLink href={href} {...props} />;
};

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

export function hymnLinkProps({_id, title, hymnNumber}: Hymn): LinkProps {
  return {
    as: `/hymn/${_id}/${String(kebabCase(title))}`,
    href: '/hymn/[id]/[name]',
    children: `${hymnNumber}. ${title}`
  };
}

export function authorLinkProps({_id, name, dates}: Author): LinkProps {
  return {
    as: `/author/${_id}/${String(kebabCase(name))}`,
    href: '/author/[id]/[name]',
    children: `${name} ${dates && `(${dates})`}`
  };
}

export function liturgyLinkProps({_id, title}: Liturgy): LinkProps {
  return {
    as: `/liturgy/${_id}/${String(kebabCase(title))}`,
    href: '/liturgy/[id]/[name]',
    children: title
  };
}

export function prayerLinkProps({_id, title}: Prayer): LinkProps {
  return {
    as: `/prayer/${_id}/${String(kebabCase(title))}`,
    href: '/prayer/[id]/[name]',
    children: title
  };
}

export function keywordLinkProps({_id, name}: Keyword): LinkProps {
  return {
    as: `/keyword/${_id}/${String(kebabCase(name))}`,
    href: '/keyword/[id]/[name]',
    children: name
  };
}

export function linkProps(props: SearchResult): LinkProps {
  switch (props._type) {
    case 'hymn':
      return hymnLinkProps(props);

    case 'author':
      return authorLinkProps(props);

    case 'prayer':
      return prayerLinkProps(props);

    case 'liturgy':
      return liturgyLinkProps(props);

    default:
      return {};
  }
}
