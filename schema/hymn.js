const {GraphQLString} = require('graphql');
const {composeWithMongoose} = require('graphql-compose-mongoose');

const renderMdx = require('../lib/render-mdx');
const books = require('../lib/books');

function hymnSchema(keystone, {AuthorTC, TuneTC, FileTC, MetreTC}) {
  const HymnTC = composeWithMongoose(keystone.list('Hymn').model);

  HymnTC.addFields({
    scripture: {
      type: GraphQLString,
      resolve: ({bookId, chapter, verses}) => {
        let scripture = '';

        if (books[bookId]) {
          scripture += books[bookId].label;

          if (chapter) {
            scripture += ` ${chapter}`;

            if (verses) {
              scripture += `:${verses}`;
            }
          }
        }

        return scripture;
      },
      projection: {bookId: true, chapter: true, verses: true}
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

  HymnTC.addRelation('metre', {
    resolver: () => MetreTC.getResolver('findById'),
    prepareArgs: {
      _id: source => source.metre
    }
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
