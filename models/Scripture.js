const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Scripture = new keystone.List('Scripture');

Scripture.add({
  name: {type: Types.Text, required: true, index: true, initial: true},
  title: {type: Types.Text},
  content: {type: Types.Markdown},
  note: {type: Types.Markdown},
  translation: {
    type: Types.Select,
    options: [{value: 'niv', label: 'NIV'}, {value: 'kjv', label: 'KJV'}]
  },
  copyright: {type: Types.Relationship, ref: 'Copyright'},
  occasions: {type: Types.Relationship, ref: 'Occasion', many: true},
  keywords: {type: Types.Relationship, ref: 'Keyword', many: true}
});

Scripture.schema.index({title: 'text'});

transform.toJSON(Scripture);
Scripture.defaultColumns = 'name, translation';
Scripture.register();
