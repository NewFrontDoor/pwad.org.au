import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="preconnect" href="https://m.stripe.com" />
          <link rel="preconnect" href="https://m.stripe.network" />
          <script async id="stripe-js" src="https://js.stripe.com/v3/" />
        </Head>
        <body>
          <Main />
          <div id="modal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
