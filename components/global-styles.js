/* eslint-disable camelcase */

import React from 'react';
import PropTypes from 'prop-types';
import {normalize} from 'polished';
import {Global, css} from '@emotion/core';
import {cabin, cabinBold, cabinExtraBold} from '../lib/constants';

function GlobalStyles({theme}) {
  return (
    <>
      <Global styles={normalize()} />
      <Global styles={cabin} />
      <Global styles={cabinBold} />
      <Global styles={cabinExtraBold} />
      <Global
        styles={css`
          body {
            background: ${theme.color_theme_10};
          }

          .icon {
            float: left;
            margin-left: -1.5rem;
            width: 1.5rem;
            height: 1em;
            color: ${theme.color_theme_10};

            &:hover {
              color: ${theme.color_theme_80};
            }
          }
          .icon-link:before {
            content: '#';
          }
        `}
      />
    </>
  );
}

GlobalStyles.propTypes = {
  theme: PropTypes.shape({
    color_theme_10: PropTypes.string,
    color_theme_80: PropTypes.string
  }).isRequired
};

export default GlobalStyles;
