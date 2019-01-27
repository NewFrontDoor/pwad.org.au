const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Menu = new keystone.List('Menu', {});

Menu.add({
  code: {
    type: Types.Text,
    required: true,
    index: true,
    unique: true,
    initial: true,
    min: 4,
    max: 20
  },
  name: {
    type: Types.Text,
    min: 5,
    max: 50
  }
});

transform.toJSON(Menu);
Menu.defaultColumns = 'code, name';
Menu.register();
