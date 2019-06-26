const mdxRuntime = require('../lib/mdx-runtime');

function render(children) {
  return mdxRuntime({
    children: children.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    remarkPlugins: [
      [require('remark-breaks')],
      [require('remark-toc'), {tight: true}]
      // require('../lib/remark-list-type')
    ],
    rehypePlugins: [require('rehype-slug'), require('rehype-autolink-headings')]
  });
}

module.exports = render;
