import Router from 'next/router';

export default (context, url) => {
  if (context.res) {
    // Server
    // 303: "See other"
    context.res.writeHead(303, {Location: url});
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(url);
  }
};

export function buildUrl(req) {
  if (req) {
    return new URL(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
  }

  return new URL(global.location);
}
