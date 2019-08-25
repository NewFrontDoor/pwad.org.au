const keystone = require('keystone');
const transform = require('model-transform');
const {isEmpty} = require('lodash');

const {Types} = keystone.Field;

const Tune = new keystone.List('Tune', {
  track: true,
  map: {
    name: 'title'
  }
});

Tune.add({
  title: {type: Types.Text, required: true, index: true, initial: true},
  metre: {type: Types.Relationship, ref: 'Metre'},
  composer: {type: Types.Relationship, ref: 'Author'},
  files: {type: Types.Relationship, ref: 'File', many: true},
  musicCopyright: {type: Types.Relationship, ref: 'Copyright'}
});

Tune.schema
  .virtual('hasWordsCopyright')
  .get(() => !isEmpty(this.wordsCopyright));

transform.toJSON(Tune);
Tune.defaultColumns = 'title, composer, metre, musicCopyright';
Tune.register();
