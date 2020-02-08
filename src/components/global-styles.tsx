import React, {FC} from 'react';
import {normalize} from 'polished';
import {css, useThemeUI} from 'theme-ui';
import {Global} from '@emotion/core';
import {cabin, cabinBold, cabinExtraBold} from '../lib/constants';

const GlobalStyles: FC = () => {
  const {theme} = useThemeUI();

  return (
    <>
      <Global styles={normalize()} />
      <Global styles={cabin} />
      <Global styles={cabinBold} />
      <Global styles={cabinExtraBold} />
      <Global
        styles={css`
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
};

export default GlobalStyles;
