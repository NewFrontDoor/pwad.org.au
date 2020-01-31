import {NextApiRequest, NextApiResponse} from 'next';
import auth0 from '../_auth0';

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    await tokenCache.getAccessToken();
    res.writeHead(302, {Location: '/my-account'}).end();
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
