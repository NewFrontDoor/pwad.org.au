import React, {ReactNode, FC, HTMLProps} from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {Link as ThemeUiLink} from 'theme-ui';
import kebabCase from 'lodash/kebabCase';
import {
  Author,
  Hymn,
  Prayer,
  Keyword,
  Liturgy,
  Asset,
  PageContent,
  Scripture,
  ChildPage
} from './queries';

type LinkProps = {
  as?: string;
  href?: string;
  onClick?: () => void;
  isInternal?: boolean;
  isBlank?: boolean;
  children?: ReactNode;
  variant?: string;
} & HTMLProps<HTMLAnchorElement>;

const Link: FC<LinkProps> = (props) => {
  const {as, href, isInternal, isBlank, ...rest} = props;
  const isNotApi = !href.startsWith('/api/');
  if (href && isInternal && isNotApi) {
    return (
      <NextLink passHref as={as} href={href}>
        <ThemeUiLink {...rest} />
      </NextLink>
    );
  }

  if (isBlank) {
    rest.target = '_blank';
    rest.rel = 'noreferrer noopener';
  }

  return <ThemeUiLink href={href} {...rest} />;
};

Link.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  isInternal: PropTypes.bool,
  isBlank: PropTypes.bool
};

Link.defaultProps = {
  as: undefined,
  href: undefined,
  isInternal: true,
  isBlank: false
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
    children: dates ? `${name} (${dates})` : name
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

export function pageContentLinkProps({slug, title}: PageContent): LinkProps {
  return {
    as: `/content/${slug}`,
    href: '/content/[slug]',
    children: title
  };
}

export function scriptureLinkProps({_id, title}: Scripture): LinkProps {
  return {
    as: `/scripture/${_id}`,
    href: '/scripture/[id]',
    children: title
  };
}

export function assetLinkProps({url, name}: Asset): LinkProps {
  return {
    isInternal: false,
    href: url,
    children: name
  };
}

export function linkProps(
  props: Hymn | Author | Prayer | Liturgy | PageContent | Asset | Scripture
): LinkProps {
  switch (props._type) {
    case 'hymn':
      return hymnLinkProps(props);

    case 'author':
      return authorLinkProps(props);

    case 'prayer':
      return prayerLinkProps(props);

    case 'liturgy':
      return liturgyLinkProps(props);

    case 'pageContent':
      return pageContentLinkProps(props);

    case 'asset':
      return assetLinkProps(props);

    case 'scripture':
      return scriptureLinkProps(props);

    default:
      return props;
  }
}

export function childPageLinkProps({
  alternateText,
  childPage
}: ChildPage): LinkProps {
  const props = linkProps(childPage);

  if (alternateText) {
    props.children = alternateText;
  }

  return props;
}
