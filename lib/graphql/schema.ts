import {makeExecutableSchema} from 'graphql-tools';
import {typeDefs} from './type-defs';
import {resolvers} from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  // @ts-expect-error it's difficult to type this correctly
  resolvers
});
