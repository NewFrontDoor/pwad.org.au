const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Keyword = new keystone.List('Keyword');

Keyword.add({
  name: {type: Types.Text, required: true, index: true, initial: true}
});

Keyword.schema.index({name: 'text'});

transform.toJSON(Keyword);
Keyword.defaultColumns = 'name';
Keyword.register();
