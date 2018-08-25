const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Tune = new keystone.List('Tune', {
  track: true
});

Tune.add(
  {
    title: {type: Types.Text, required: true, index: true, initial: true}
  }
);

transform.toJSON(Tune);
Tune.defaultColumns = '';
Tune.register();
