const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Menu = new keystone.List('Menu', {sortable: true});

Menu.add({
  code: {
    type: Types.Text,
    required: true,
    index: true,
    unique: true,
    initial: true,
    min: 3,
    max: 20
  },
  name: {
    type: Types.Text,
    min: 3,
    max: 50
  },
  type: {
    type: Types.Select,
    options: [
      {value: 'list', label: 'Menu List'},
      {value: 'link', label: 'Menu Link'}
    ]
  },
  link: {
    type: Types.Relationship,
    ref: 'PageContent',
    dependsOn: {type: 'link'},
    initial: false
  }
});

Menu.schema.pre('save', function(next) {
  if (this.type !== 'link') {
    this.link = null;
  }

  return next();
});

transform.toJSON(Menu);
Menu.defaultColumns = 'code, name, type, link';
Menu.register();
