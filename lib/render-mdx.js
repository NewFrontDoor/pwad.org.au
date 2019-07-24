const {GraphQLString, GraphQLInt} = require('graphql');
const {truncate} = require('lodash');
const renderMdxValue = require('./mdx-value');

function renderMdx(field) {
  return {
    [field]: {
      type: GraphQLString,
      args: {
        truncate: GraphQLInt
      },
      resolve(result, args) {
        let {md} = result;

        if (args.truncate) {
          md = truncate(result.md, {
            length: args.truncate,
            separator: ' '
          });
        }

        return renderMdxValue(md);
      }
    }
  };
}

module.exports = renderMdx;
