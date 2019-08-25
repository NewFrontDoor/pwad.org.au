const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Occasion = new keystone.List('Occasion', {
  sortable: true
});

Occasion.add({
  name: {type: Types.Text, required: true, index: true, initial: true},
  parent: {type: Types.Relationship, ref: 'Occasion'},
  churchYear: {type: Types.Boolean}
});

transform.toJSON(Occasion);
Occasion.defaultColumns = 'name';
Occasion.register();
