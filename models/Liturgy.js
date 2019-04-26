const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Liturgy = new keystone.List('Liturgy');

Liturgy.add({
  name: {type: Types.Text, required: true, index: true, initial: true}
});

transform.toJSON(Liturgy);
Liturgy.defaultColumns = 'name';
Liturgy.register();
