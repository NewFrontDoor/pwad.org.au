import React from 'react';
import withApollo from '../lib/with-apollo-client';

import PageLayout from '../components/page-layout';

class ShortList extends React.Component {
  render() {
    return (
      <PageLayout>
        <div />
      </PageLayout>
    );
  }
}

export default withApollo(ShortList);
