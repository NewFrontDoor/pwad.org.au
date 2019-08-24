const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Prayer = new keystone.List('Prayer', {
  map: {name: 'title'}
});

Prayer.add({
  title: {type: Types.Text, required: true, index: true, initial: true},
  content: {type: Types.Markdown},
  note: {type: Types.Markdown},
  author: {type: Types.Relationship, ref: 'Author'},
  occasions: {type: Types.Relationship, ref: 'Occasion', many: true},
  copyright: {type: Types.Relationship, ref: 'Copyright'},
  keywords: {type: Types.Relationship, ref: 'Keyword', many: true},
  categories: {type: Types.Relationship, ref: 'Category', many: true}
});

Prayer.schema.index({title: 'text', content: 'text'});

transform.toJSON(Prayer);
Prayer.defaultColumns = 'title';
Prayer.register();
