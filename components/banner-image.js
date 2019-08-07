/* eslint-disable camelcase */

/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {withTheme} from 'emotion-theming';
import PropTypes from 'prop-types';
import {rgba} from 'polished';

const banners = [
  'brown-book-page',
  'brown-wooden-church-bench',
  'brown-wooden-church-pew',
  'church-under-blue-sky'
];

export function randomBanner() {
  const rand = Math.random();

  return banners[Math.floor(rand * banners.length)];
}

function BannerImage({image, theme}) {
  const sizes = ['medium', 'wide'].map(size => ({
    size,
    width: theme[`breakpoint_${size}`]
  }));

  const background = size => css`
    background-image: linear-gradient(
        0deg,
        ${theme.color_theme_10},
        ${rgba(theme.color_theme_10, 0.8)}
      ),
      url('/static/banners/${image}${size}.jpeg');
  `;

  const backgroundMap = sizes.map(
    ({size, width}) =>
      css`
        @media (min-width: ${width}) {
          ${background(`-${size}@1x`)}
        }

        @media (min-resolution: 1.25dppx) and (min-width: ${width}) {
          ${background(`-${size}@2x`)}
        }
      `
  );

  return (
    <div
      css={css`
        z-index: -1;
        position: absolute;
        left: 0;
        right: 0;
        height: 100vh;

        background: ${theme.color_theme_10};

        ${background('@1x')}

        @media (min-resolution: 1.25dppx) {
          ${background('@2x')}
        }

        ${backgroundMap}

        background-size: cover;
        background-repeat: no-repeat;
        background-position: top center;
      `}
    />
  );
}

BannerImage.propTypes = {
  image: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    color_theme_10: PropTypes.string,
    color_theme_80: PropTypes.string
  }).isRequired
};

export default withTheme(BannerImage);
