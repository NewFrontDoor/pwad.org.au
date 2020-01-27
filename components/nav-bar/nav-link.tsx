/** @jsx jsx */
import {FC} from 'react';
import {jsx} from 'theme-ui';
import PropTypes from 'prop-types';
import Link from '../link';
import {ChildPageReference, PageContent, Asset} from '../queries';

export type NavLinkProps = ChildPageReference;

function isAsset(link: ChildPageReference): link is Asset {
  return link.__typename === 'Asset';
}

function isPageContent(link: ChildPageReference): link is PageContent {
  return link.__typename === 'PageContent';
}

const NavLink: FC<NavLinkProps> = props => {
  let as: string;
  let isInternal = true;
  let href: string;
  let title: string;

  if (isAsset(props)) {
    isInternal = false;
    href = props.file;
    title = props.name;
  }

  if (isPageContent(props)) {
    isInternal = true;
    href = '/content/[page]';
    title = props.title;
    as = `/content/${props._id}`;
  }

  return (
    <Link href={href} as={as} isInternal={isInternal}>
      {title}
    </Link>
  );
};

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  file: PropTypes.string
};

NavLink.defaultProps = {
  file: undefined,
  name: undefined
};

export default NavLink;
