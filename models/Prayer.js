const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Prayer = new keystone.List('Prayer');

Prayer.add({
  name: {type: Types.Text, required: true, index: true, initial: true},
  title: {type: Types.Text},
  content: {type: Types.Markdown},
  note: {type: Types.Markdown},
  author: {type: Types.Relationship, ref: 'Author'},
  occasion: {type: Types.Relationship, ref: 'Occasion'},
  copyright: {type: Types.Relationship, ref: 'Copyright'},
  keywords: {type: Types.Relationship, ref: 'Keyword', many: true},
  categories: {type: Types.Relationship, ref: 'Category', many: true}
});

transform.toJSON(Prayer);
Prayer.defaultColumns = 'name';
Prayer.register();
