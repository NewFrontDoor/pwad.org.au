import {GetServerSidePropsContext, Redirect} from 'next';
import {ResultAsync} from 'neverthrow';
import {getUserContext} from './graphql/context';
import {User} from './graphql/gen-types';

export default function protectedGetServerSideProps(
  context: GetServerSidePropsContext
): ResultAsync<User, Redirect> {
  return getUserContext(context.req, context.res).mapErr(() => ({
    statusCode: 302,
    destination: '/api/auth/login'
  }));
}
