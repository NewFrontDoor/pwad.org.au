const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Topic = new keystone.List('Topic');

Topic.add(
  {
    name: {type: Types.Text, required: true, index: true, initial: true}
  }
);

transform.toJSON(Topic);
Topic.defaultColumns = 'name';
Topic.register();
