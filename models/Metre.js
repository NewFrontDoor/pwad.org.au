const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Metre = new keystone.List('Metre', {
  track: true,
  map: {
    name: 'metre'
  }
});

Metre.add({
  metre: {
    type: Types.Text,
    required: true,
    index: true,
    initial: true,
    unique: true
  }
});

Metre.schema.index({metre: 'text'});

transform.toJSON(Metre);
Metre.defaultColumns = 'metre';
Metre.register();
