/* eslint-env browser */

import {IncomingMessage} from 'http';

export default function buildUrl(req: IncomingMessage): URL {
  let host = new URL('http://localhost:3000');

  if (req) {
    const reqProto = req.headers['x-forwarded-proto'];
    const reqHost = req.headers['x-forwarded-host'];
    if (typeof reqProto === 'string' && typeof reqHost === 'string') {
      host = new URL(`${reqProto}://${reqHost}`);
    }
  } else {
    host = new URL(window.location.href);
  }

  return host;
}
