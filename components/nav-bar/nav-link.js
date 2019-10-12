/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import Link from '../link';

const NavLink = ({name, url, file, type, content}) => {
  let as;
  let isInternal = true;
  let href = url;

  if (type === 'file') {
    isInternal = false;
    href = file.url;
  }

  if (content) {
    href = `/content/[page]`;
    as = `/content/${content.key}`;
  }

  return (
    <Link href={href} as={as} isInternal={isInternal}>
      {name}
    </Link>
  );
};

NavLink.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
  file: PropTypes.shape({
    url: PropTypes.string.isRequired
  }),
  content: PropTypes.shape({
    key: PropTypes.string.isRequired
  })
};

NavLink.defaultProps = {
  url: undefined,
  file: undefined,
  content: undefined
};

export default NavLink;
