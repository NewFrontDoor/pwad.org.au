const keystone = require('keystone');
const transform = require('model-transform');

const {Types} = keystone.Field;

const Hymn = new keystone.List('Hymn', {
  track: true,
  map: {name: 'title'}
});

Hymn.add({
  hymnNumber: {type: Types.Number, required: true, index: true, initial: true},
  title: {type: Types.Text, required: true, index: true, initial: true},
  bookId: {type: Types.Number},
  chapterVerse: {type: Types.Text},
  lyrics: {type: Types.Markdown},
  wordsCopyright: {type: Types.Text},
  tune: {type: Types.Relationship, ref: 'Tune'},
  bio: {type: Types.Markdown},
  chapter: {type: Types.Number},
  verses: {type: Types.Text}
});

// FIXME check for wordsCopyright
Hymn.schema.virtual('hasWordsCopyright').get(() => true);

Hymn.schema.index({title: 'text'});

transform.toJSON(Hymn);
Hymn.defaultColumns = 'title, hymnNumber, bookId';
Hymn.register();
