/* eslint-env browser */

import {IncomingMessage} from 'http';

export default function buildUrl(request: IncomingMessage): URL {
  let host = new URL('http://localhost:3000');

  if (request) {
    const requestProto = request.headers['x-forwarded-proto'];
    const requestHost = request.headers['x-forwarded-host'];
    if (typeof requestProto === 'string' && typeof requestHost === 'string') {
      host = new URL(`${requestProto}://${requestHost}`);
    }
  } else {
    host = new URL(window.location.origin);
  }

  return host;
}
