/* eslint-env browser */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {getDataFromTree} from '@apollo/react-ssr';
import initApollo from './init-apollo';

function getHost(req) {
  return req ? req.headers.host : window.location.host;
}

function getCookie(req) {
  return req ? req.headers.cookie || '' : document.cookie;
}

export default App => {
  class Apollo extends React.Component {
    static propTypes = {
      host: PropTypes.string.isRequired,
      apolloState: PropTypes.object.isRequired
    };

    static displayName = 'withApollo(App)';

    static async getInitialProps(context) {
      const {
        Component,
        router,
        ctx: {req, res}
      } = context;
      const cookie = getCookie(req);
      const host = getHost(req);
      const apollo = initApollo(
        {},
        {
          getHost: () => host,
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
        host
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(props.apolloState, {
        getToken: () => getCookie(),
        getHost: () => getHost({headers: {host: props.host}})
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apollo} />;
    }
  }

  return Apollo;
};
