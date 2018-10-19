const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Author = new keystone.List('Author', {
  track: true
});

Author.add({
  name: {type: Types.Name, required: true, index: true, initial: true},
  dates: {type: Types.Text}
});

transform.toJSON(Author);
Author.defaultColumns = 'name, dates';
Author.register();
