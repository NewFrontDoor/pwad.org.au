const {GraphQLString, GraphQLFloat} = require('graphql');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const renderMdx = require('../lib/render-mdx');
const books = require('../lib/books');

function hymnSchema(keystone, {AuthorTC, TuneTC, FileTC, KeywordTC}, options) {
  const HymnTC = composeWithMongoose(keystone.list('Hymn').model, options);

  HymnTC.addFields({
    scripture: {
      type: GraphQLString,
      resolve({book, chapter, verses}) {
        let scripture = '';
        const found = books.find(({value}) => book === value);

        if (found) {
          scripture += found.label;

          if (chapter) {
            scripture += ` ${chapter}`;

            if (verses) {
              scripture += `:${verses}`;
            }
          }
        }

        return scripture;
      },
      projection: {book: true, chapter: true, verses: true}
    },
    score: {
      type: GraphQLFloat,
      resolve(args) {
        if (typeof args.get === 'undefined') {
          return 0;
        }

        return args.get('score');
      }
    }
  });

  HymnTC.addNestedFields(renderMdx('lyrics.md'));
  HymnTC.addNestedFields(renderMdx('bio.md'));

  HymnTC.addRelation('author', {
    resolver: () => AuthorTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.author
    }
  });

  HymnTC.addRelation('tune', {
    resolver: () => TuneTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.tune
    }
  });

  HymnTC.addRelation('keywords', {
    resolver: () => KeywordTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.keywords || []
    },
    projection: {keywords: true}
  });

  HymnTC.addRelation('files', {
    resolver: () => FileTC.getResolver('findByIds'),
    prepareArgs: {
      _ids: source => source.files || []
    },
    projection: {files: true}
  });

  return HymnTC;
}

module.exports = hymnSchema;
