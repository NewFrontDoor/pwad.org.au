const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Prayer = new keystone.List('Prayer');

Prayer.add({
  name: {type: Types.Text, required: true, index: true, initial: true}
});

transform.toJSON(Prayer);
Prayer.defaultColumns = 'name';
Prayer.register();
