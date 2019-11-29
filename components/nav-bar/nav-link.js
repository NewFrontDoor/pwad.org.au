/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import Link from '../link';

const NavLink = ({title, _id, url, file, _type}) => {
  let as;
  let isInternal = true;
  let href = url;

  if (_type === 'file') {
    isInternal = false;
    href = file.url;
  }

  if (_type === 'pageContent') {
    isInternal = true;
    href = `/content/[page]`;
    as = `/content/${_id}`;
  }

  return (
    <Link href={href} as={as} isInternal={isInternal}>
      {title}
    </Link>
  );
};

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  _type: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  url: PropTypes.string,
  file: PropTypes.shape({
    url: PropTypes.string.isRequired
  })
};

NavLink.defaultProps = {
  url: undefined,
  file: undefined
};

export default NavLink;
