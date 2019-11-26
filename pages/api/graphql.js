import nanoid from 'nanoid';
import microCors from 'micro-cors';
import {ApolloServer, gql} from 'apollo-server-micro';
import auth0 from '../../lib/auth0';
import sanity from '../../lib/sanity';

function isEmptyObject(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

const typeDefs = gql`
  type Name {
    first: String
    last: String
  }

  type ShortList {
    _id: String
    title: String
    hymnNumber: String
  }

  type User {
    _id: String
    name: Name
    email: String
    role: String
    hasPaidAccount: Boolean
    hasFreeAccount: Boolean
    picture: String
    googleProviderId: String
    shortlist: [ShortList]
  }

  type Query {
    me: User
  }

  type Mutation {
    addShortListItem(hymn: String): User
    removeShortListItem(hymn: String): User
  }
`;

const resolvers = {
  Query: {
    async me(parent, args, context) {
      try {
        const user = await context.user;

        return user;
      } catch (_) {
        console.log(_);
        return null;
      }
    }
  },
  Mutation: {
    async addShortListItem(parent, args, context) {
      const user = await context.user;

      await sanity
        .patch(user._id)
        .setIfMissing({shortlist: {hymns: []}})
        .append('shortlist.hymns', [
          {
            _key: nanoid(),
            _ref: args.hymn,
            _type: 'reference'
          }
        ])
        .commit();

      const {shortlist} = await queryUserById(user._id);

      return {
        ...user,
        shortlist
      };
    },
    async removeShortListItem(parent, args, context) {
      const user = await context.user;

      const itemIndex = user.shortlist.findIndex(({_id}) => args.hymn === _id);

      if (itemIndex >= 0) {
        await sanity
          .patch(user._id)
          .setIfMissing({shortlist: {hymns: []}})
          .insert('replace', `shortlist.hymns[${itemIndex}]`, [])
          .commit();

        const {shortlist} = await queryUserById(user._id);

        return {
          ...user,
          shortlist
        };
      }

      return user;
    }
  }
};

function queryUserById(id) {
  return sanity.fetch(
    `*[_type == "user" && _id == $id][0]{
      _id,
      name,
      email,
      "role": permission.role,
      "shortlist":shortlist.hymns[]->{_id,title,hymnNumber}
  }`,
    {id}
  );
}

async function findOrCreateUser(user) {
  const result = await sanity.fetch(
    `*[_type == "user" && googleProviderId == $googleProviderId][0]{
      _id,
      name,
      email,
      "role": permission.role,
      "shortlist":shortlist.hymns[]->{_id,title,hymnNumber}
  }`,
    {googleProviderId: user.sub}
  );

  if (isEmptyObject(result)) {
    return sanity.create({
      _type: 'user',
      name: {
        first: user.given_name,
        last: user.family_name
      },
      email: user.email,
      googleProviderId: user.sub,
      permission: {
        role: 'public'
      }
    });
  }

  return result;
}

async function getUserContext(req) {
  const {user} = await auth0.getSession(req);

  const {_id, name, email, role, shortlist = []} = await findOrCreateUser(user);

  return {
    _id,
    role,
    name,
    email,
    shortlist,
    picture: user.picture
  };
}

const cors = microCors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context({req}) {
    return {
      user: getUserContext(req)
    };
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default cors(apolloServer.createHandler({path: '/api/graphql'}));
