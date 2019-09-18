const remark = require('remark');
const strip = require('strip-markdown');
const {GraphQLString, GraphQLInt} = require('graphql');
const {truncate} = require('lodash');
const renderMdxValue = require('./mdx-value');

function truncatedResult(string, options) {
  const {contents} = remark()
    .use(strip)
    .processSync(string);

  return truncate(contents, options);
}

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
          md = truncatedResult(result.md, {
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
