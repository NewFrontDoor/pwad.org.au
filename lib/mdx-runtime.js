const {transform} = require('buble');
const mdx = require('@mdx-js/mdx');

module.exports = ({remarkPlugins = [], rehypePlugins = [], children}) => {
  const jsx = mdx
    .sync(children, {
      remarkPlugins,
      rehypePlugins,
      skipExport: true
    })
    .trim();

  const {code} = transform(jsx, {
    objectAssign: 'Object.assign'
  });

  return `${code}
    return React.createElement(MDXProvider, { components },
      React.createElement(MDXContent, props)
    );`;
};
