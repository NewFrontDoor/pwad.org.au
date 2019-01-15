/* eslint-env browser */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {getDataFromTree} from 'react-apollo';
import initApollo from './init-apollo';

function getCookie(req) {
  return req ? req.headers.cookie || '' : document.cookie;
}

export default App => {
  class Apollo extends React.Component {
    static async getInitialProps(context) {
      const {
        Component,
        router,
        ctx: {req, res}
      } = context;
      const cookie = getCookie(req);
      const apollo = initApollo(
        {},
        {
          getToken: () => cookie
        }
      );

      context.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(context);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {};
      }

      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloClient={apollo}
          />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error);
      }

      if (!process.browser) {
        // `getDataFromTree` does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
        cookie
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(props.apolloState, {
        getToken: () => getCookie()
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apollo} />;
    }
  }

  Apollo.propTypes = {
    apolloState: PropTypes.object.isRequired
  };

  Apollo.displayName = 'withApollo(App)';

  return Apollo;
};
