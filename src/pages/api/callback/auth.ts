import {NextApiRequest, NextApiResponse} from 'next';
import auth0 from '../../../../lib/auth0';

export default async function callback(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    await auth0.handleCallback(request, response, {redirectTo: '/'});
  } catch (error) {
    console.error(error);
    response.status(error.status || 400).end(error.message);
  }
}
