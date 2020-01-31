import {NextApiRequest, NextApiResponse} from 'next';
import auth0 from '../_auth0';

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const {user} = await auth0.getSession(req);
    console.log(user);
    await auth0.handleProfile(req, res, {
      refetch: true,
      redirect: '/my-account'
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
