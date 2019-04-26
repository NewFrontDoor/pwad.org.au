const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Occasion = new keystone.List('Occasion');

Occasion.add({
  name: {type: Types.Text, required: true, index: true, initial: true}
});

transform.toJSON(Occasion);
Occasion.defaultColumns = 'name';
Occasion.register();
