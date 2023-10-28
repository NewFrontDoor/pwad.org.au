import {makeExecutableSchema} from 'graphql-tools';
import {typeDefs} from './type-defs';
import {resolvers} from './resolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  //it's difficult to type this correctly
  // @ts-ignore
  resolvers
});
