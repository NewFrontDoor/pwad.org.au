const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const PageContent = new keystone.List('PageContent', {
  autokey: {from: 'name', path: 'key', unique: true}
});

PageContent.add({
  name: {type: Types.Text, required: true, initial: true},
  content: {
    brief: {type: Types.Markdown},
    extended: {type: Types.Markdown}
  }
});

transform.toJSON(PageContent);
PageContent.defaultColumns = 'name';
PageContent.register();
