const keystone = require('keystone');
const transform = require('model-transform');

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
  musicCopyright: {type: Types.Text}
});

// FIXME check for wordsCopyright
Tune.schema.virtual('hasMusicCopyright').get(() => true);

transform.toJSON(Tune);
Tune.defaultColumns = 'title, metre, musicCopyright';
Tune.register();
