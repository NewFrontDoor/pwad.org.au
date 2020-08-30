import microCors from 'micro-cors';
import {ApolloServer} from 'apollo-server-micro';
import {schema} from '../../../lib/graphql/schema';
import {context} from '../../../lib/graphql/context';

const apolloServer = new ApolloServer({
  schema,
  context
});

const cors = microCors();

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(apolloServer.createHandler({path: '/api/graphql'}));
