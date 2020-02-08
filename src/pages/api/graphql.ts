import microCors from 'micro-cors';
import graphql from '../../../lib/graphql';

const cors = microCors();

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(graphql.createHandler({path: '/api/graphql'}));
