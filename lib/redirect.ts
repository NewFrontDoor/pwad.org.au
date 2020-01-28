/* eslint-env browser */

import {IncomingMessage} from 'http';
import {NextPageContext} from 'next';
import Router from 'next/router';

export default (url: string, context?: NextPageContext): void => {
  if (context?.res) {
    // Server
    // 303: "See other"
    context.res.writeHead(303, {Location: url});
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(url);
  }
};

export function buildUrl(req: IncomingMessage): URL {
  if (req) {
    return new URL(req.originalUrl, 'http://localhost:3000');
  }

  return new URL(window.location.href);
}
