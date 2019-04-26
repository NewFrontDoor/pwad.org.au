import React from 'react';
import {normalize} from 'polished';
import {Global} from '@emotion/core';
import {cabin, cabinBold, cabinExtraBold} from '../lib/constants';

export default () => {
  return (
    <>
      <Global styles={normalize()} />
      <Global styles={cabin} />
      <Global styles={cabinBold} />
      <Global styles={cabinExtraBold} />
    </>
  );
};
