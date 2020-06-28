/* eslint-env browser */

import {NextPageContext} from 'next';
import Router from 'next/router';
export {default as buildUrl} from './build-url';

function redirect(url: string, context?: NextPageContext): void {
  if (context?.res) {
    // Server
    // 303: "See other"
    context.res.writeHead(303, {Location: url});
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    void Router.replace(url);
  }
}

export default redirect;
