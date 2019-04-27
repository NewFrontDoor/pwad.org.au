const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Copyright = new keystone.List('Copyright');

Copyright.add({
  name: {type: Types.Text, required: true, index: true, initial: true}
});

transform.toJSON(Copyright);
Copyright.defaultColumns = 'name';
Copyright.register();
