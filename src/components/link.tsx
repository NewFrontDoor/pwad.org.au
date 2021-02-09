import React, {FC, HTMLProps} from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import {Link as ThemeUiLink} from 'theme-ui';
import kebabCase from 'lodash/kebabCase';

import {
  Author,
  Prayer,
  Keyword,
  Liturgy,
  Asset,
  PageContent,
  Scripture,
  Hymn,
  ChildPage
} from '../../queries/_types';

type LinkProps = {
  href: string;
  onClick?: () => void;
  isInternal?: boolean;
  isBlank?: boolean;
  variant?: string;
} & HTMLProps<HTMLAnchorElement>;

const Link: FC<LinkProps> = (props) => {
  const {href, isInternal, isBlank, ...rest} = props;
  const isNotApi = !href?.startsWith('/api/');
  if (href && isInternal && isNotApi) {
    return (
      <NextLink passHref href={href}>
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
  href: PropTypes.string.isRequired,
  isInternal: PropTypes.bool,
  isBlank: PropTypes.bool
};

Link.defaultProps = {
  isInternal: true,
  isBlank: false
};

export default Link;

export function hymnLinkProps({
  _id,
  title,
  hymnNumber
}: Pick<Hymn, '_id' | 'title' | 'hymnNumber'>): LinkProps {
  return {
    href: `/hymn/${_id}/${String(kebabCase(title))}`,
    children: `${hymnNumber}. ${title}`
  };
}

export function authorLinkProps({
  _id,
  name,
  dates
}: Pick<Author, '_id' | 'name' | 'dates'>): LinkProps {
  return {
    href: `/author/${_id}/${String(kebabCase(name))}`,
    children: dates ? `${name} (${dates})` : name
  };
}

export function liturgyLinkProps({
  _id,
  title
}: Pick<Liturgy, '_id' | 'title'>): LinkProps {
  return {
    href: `/liturgy/${_id}/${String(kebabCase(title))}`,
    children: title
  };
}

export function prayerLinkProps({
  _id,
  title
}: Pick<Prayer, '_id' | 'title'>): LinkProps {
  return {
    href: `/prayer/${_id}/${String(kebabCase(title))}`,
    children: title
  };
}

export function keywordLinkProps({
  _id,
  name
}: Pick<Keyword, '_id' | 'name'>): LinkProps {
  return {
    href: `/keyword/${_id}/${String(kebabCase(name))}`,
    children: name
  };
}

export function pageContentLinkProps({
  slug,
  title
}: Pick<PageContent, 'slug' | 'title'>): LinkProps {
  return {
    href: `/content/${slug}`,
    children: title
  };
}

export function scriptureLinkProps({
  _id,
  title
}: Pick<Scripture, '_id' | 'title'>): LinkProps {
  return {
    href: `/scripture/${_id}`,
    children: title
  };
}

export function assetLinkProps({
  url,
  name
}: Pick<Asset, 'url' | 'name'>): LinkProps {
  return {
    isInternal: false,
    href: url,
    children: name
  };
}

export type GenLinkProps =
  | Hymn
  | Author
  | Prayer
  | Liturgy
  | PageContent
  | Asset
  | Scripture
  | {
      _id: string;
      _type: never;
      children?: string | string[];
    };

export function linkProps(props: GenLinkProps): LinkProps {
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
  const props = childPage ? linkProps(childPage) : {href: ''};

  if (alternateText) {
    props.children = alternateText;
  }

  return props;
}
