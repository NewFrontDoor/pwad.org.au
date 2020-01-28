import React, {FC} from 'react';
import {Styled} from 'theme-ui';
import {TypeScale, TypeStyle, ColorPalette} from '@theme-ui/style-guide';

const StyleGuide: FC = () => (
  <>
    <Styled.h1>Style Guide</Styled.h1>
    <ColorPalette />
    <TypeScale />
    <TypeStyle fontFamily="heading" fontWeight="heading" lineHeight="heading" />
    <TypeStyle fontFamily="body" fontWeight="body" lineHeight="body" />
  </>
);

export default StyleGuide;
