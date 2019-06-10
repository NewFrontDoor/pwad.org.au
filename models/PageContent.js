const keystone = require('keystone');
const transform = require('model-transform');
const sanitizeHtml = require('sanitize-html');
const mdxRuntime = require('../lib/mdx-runtime');

const {Types} = keystone.Field;

const PageContent = new keystone.List('PageContent', {
  autokey: {from: 'name', path: 'key', unique: true}
});

const markedOptions = {};
const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'Background',
    'Bible'
  ]),
  selfClosing: sanitizeHtml.defaults.selfClosing.concat(['Bible']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    Bible: ['passage'],
    Background: ['colour']
  },
  parser: {
    lowerCaseTags: false
  }
};

function value() {
  return mdxRuntime({
    children: this.content.md.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
    remarkPlugins: [
      [require('remark-toc'), {tight: true}]
      // require('../lib/remark-list-type')
    ],
    rehypePlugins: [require('rehype-slug'), require('rehype-autolink-headings')]
  });
}

PageContent.add({
  name: {type: Types.Text, required: true, initial: true},
  content: {type: Types.Markdown, markedOptions, sanitizeOptions},
  mdx: {
    type: String,
    hidden: true,
    watch: 'content.md',
    value
  }
});

transform.toJSON(PageContent);
PageContent.defaultColumns = 'name';
PageContent.register();
