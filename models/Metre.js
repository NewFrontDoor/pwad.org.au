const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Metre = new keystone.List('Metre', {
  track: true
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

transform.toJSON(Metre);
Metre.defaultColumns = 'metre';
Metre.register();
