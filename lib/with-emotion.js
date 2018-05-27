import React from 'react';
import {hydrate} from 'react-emotion';
import injectGlobalStyles from './inject-global-styles';

export default function withEmotion(ComposedComponent) {
  class WithEmotion extends React.Component {
    componentWillMount() {
      if (typeof global.window !== 'undefined') {
        hydrate(global.window.__NEXT_DATA__.ids);
      }

      injectGlobalStyles();
    }

    render() {
      return <ComposedComponent/>;
    }
  }

  return WithEmotion;
}
