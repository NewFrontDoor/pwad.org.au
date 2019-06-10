import React from 'react';
import PropTypes from 'prop-types';
import {MDXProvider, mdx as createElement} from '@mdx-js/react';

function MDXRenderer({components, children, scope, ...props}) {
  if (!children) {
    return null;
  }

  const fullScope = {
    mdx: createElement,
    MDXProvider,
    components,
    props,
    ...scope
  };

  const keys = Object.keys(fullScope);
  const values = keys.map(key => fullScope[key]);
  // eslint-disable-next-line no-new-func
  const fn = new Function('_fn', 'React', ...keys, `${children}`);

  return fn({}, React, ...values);
}

MDXRenderer.propTypes = {
  scope: PropTypes.object,
  components: PropTypes.object.isRequired,
  children: PropTypes.string
};

MDXRenderer.defaultProps = {
  scope: {},
  children: undefined
};

export default MDXRenderer;
