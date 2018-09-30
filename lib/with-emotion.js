import React from 'react';
import {hydrate} from 'react-emotion';
import injectGlobalStyles from './inject-global-styles';

export default ComposedComponent => {
  class WithEmotion extends React.Component {
    static getInitialProps(ctx) {
      if (ComposedComponent.getInitialProps) {
        return ComposedComponent.getInitialProps(ctx);
      }
    }

    constructor(props) {
      super(props);
      if (typeof global.window !== 'undefined') {
        hydrate(global.window.__NEXT_DATA__.ids);
      }

      injectGlobalStyles();
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }

  return WithEmotion;
};
