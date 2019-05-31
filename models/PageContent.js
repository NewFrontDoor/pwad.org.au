const keystone = require('keystone');
const transform = require('model-transform');
const sanitizeHtml = require('sanitize-html');

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

PageContent.add({
  name: {type: Types.Text, required: true, initial: true},
  content: {
    brief: {type: Types.Markdown, markedOptions, sanitizeOptions},
    extended: {type: Types.Markdown}
  }
});

transform.toJSON(PageContent);
PageContent.defaultColumns = 'name';
PageContent.register();
