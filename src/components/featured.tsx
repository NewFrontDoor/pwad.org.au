import React, {FC} from 'react';
import {Styled, Grid, Card} from 'theme-ui';

import Link from './link';

const Featured: FC = () => (
  <>
    <Styled.h3>Featured</Styled.h3>
    <Grid columns={[1, 3]}>
      <Link href="/liturgy">
        <Card>Worship</Card>
      </Link>
      <Link href="/prayer">
        <Card>Pray</Card>
      </Link>
      <Link href="/hymn">
        <Card>Rejoice</Card>
      </Link>
    </Grid>
  </>
);

export default Featured;
