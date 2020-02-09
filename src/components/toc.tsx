/** @jsx jsx */
import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {jsx} from 'theme-ui';

type TocProps = {
  headings?: Array;
};

const Toc: FC<TocProps> = ({headings}) => {
  return (
    <div>
      <h2>Contents:</h2>
      <ul>
        {headings.map(item => (
          <li key={item.slug}>
            <a href={item.slug}>{item.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Toc.propTypes = {
  headings: PropTypes.array.isRequired
};

export default Toc;
