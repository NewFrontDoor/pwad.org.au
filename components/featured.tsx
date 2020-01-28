import React, {FC} from 'react';
import {Styled, Grid, Card} from 'theme-ui';

import Link from './link';

const Featured: FC = () => (
  <>
    <Styled.h3>Featured</Styled.h3>
    <Grid columns={[1, 3]}>
      <Link href="/hymn">
        <Card>Worship</Card>
      </Link>
      <Link href="/pray">
        <Card>Pray</Card>
      </Link>
      <Link href="/litergy">
        <Card>Rejoice</Card>
      </Link>
    </Grid>
  </>
);

export default Featured;
