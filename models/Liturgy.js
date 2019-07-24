const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Liturgy = new keystone.List('Liturgy');

Liturgy.add({
  name: {type: Types.Text, required: true, index: true, initial: true},
  title: {type: Types.Text},
  content: {type: Types.Markdown},
  note: {type: Types.Markdown},
  author: {type: Types.Relationship, ref: 'Author'},
  copyright: {type: Types.Relationship, ref: 'Copyright'},
  occasion: {type: Types.Relationship, ref: 'Occasion'},
  keywords: {type: Types.Relationship, ref: 'Keyword', many: true},
  files: {type: Types.Relationship, ref: 'File', many: true}
});

transform.toJSON(Liturgy);
Liturgy.defaultColumns = 'name';
Liturgy.register();
