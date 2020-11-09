/** @jsx jsx */
import {FC} from 'react';
import {Styled, jsx, useThemeUI} from 'theme-ui';
import PropTypes from 'prop-types';
import {rgba} from 'polished';

const banners = [
  'brown-book-page',
  'brown-wooden-church-bench',
  'brown-wooden-church-pew',
  'church-under-blue-sky'
];

export function randomBanner(): string {
  const rand = Math.random();

  return banners[Math.floor(rand * banners.length)];
}

type BannerImageProps = {
  image: string;
};

const BannerImage: FC<BannerImageProps> = ({image}) => {
  const {theme} = useThemeUI();
  const sizes = ['medium', 'wide'].map((size, index) => ({
    size,
    width: theme.breakpoints[index + 1]
  }));

  const background = (size: string): {backgroundImage: string} => ({
    backgroundImage: `linear-gradient(
        0deg,
        ${theme.colors.gray[1]},
        ${rgba(theme.colors.gray[1], 0.4)}
      ),
      url('/static/banners/${image}${size}.jpeg')`
  });

  const backgroundMap = {};

  for (const {size, width} of sizes) {
    Object.assign(backgroundMap, {
      [`@media (min-width: ${width})`]: background(`-${size}@1x`),
      [`@media (min-resolution: 1.25dppx) and (min-width: ${width})`]: background(
        `-${size}@2x`
      )
    });
  }

  return (
    <Styled.div
      sx={{
        zIndex: -1,
        position: 'fixed',
        left: 0,
        right: 0,
        height: '100vh',

        background: theme.colors.blue[1],

        ...background('@1x'),

        '@media (min-resolution: 1.25dppx)': background('@2x'),

        ...backgroundMap,

        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center'
      }}
    />
  );
};

BannerImage.propTypes = {
  image: PropTypes.string.isRequired
};

export default BannerImage;
