import {NextApiRequest, NextApiResponse} from 'next';
import auth0 from '../../../lib/auth0';

export default async function logout(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    await auth0.handleLogout(request, response);
  } catch (error) {
    console.error(error);
    response.status(error.status || 400).end(error.message);
  }
}
