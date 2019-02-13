const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Category = new keystone.List('Category', {
  track: true
});

Category.add({
  name: {type: Types.Text, required: true, index: true, initial: true},
  parent: {type: Types.Relationship, ref: 'Category'}
});

transform.toJSON(Category);
Category.defaultColumns = 'name, parent';
Category.register();
