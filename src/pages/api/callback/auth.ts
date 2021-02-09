import {NextApiRequest, NextApiResponse} from 'next';
import auth0 from '../../../../lib/auth0';

export default async function callback(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    await auth0.handleCallback(request, response, {redirectTo: '/'});
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      // @ts-expect-error error stats ??
      response.status(error.status ?? 400).end(error.message);
    }
  }
}
