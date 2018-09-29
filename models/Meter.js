const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Meter = new keystone.List('Meter', {
  track: true
});

Meter.add(
  {
    meter: {type: Types.Text, required: true, index: true, initial: true, unique: true}
  }
);

transform.toJSON(Meter);
Meter.defaultColumns = 'meter';
Meter.register();
