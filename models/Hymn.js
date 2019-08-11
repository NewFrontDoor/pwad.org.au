const keystone = require('keystone');
const transform = require('model-transform');
const {findIndex, isEmpty} = require('lodash');

const books = require('../lib/books');

const {Types} = keystone.Field;

const Hymn = new keystone.List('Hymn', {
  track: true,
  map: {name: 'title'}
});

Hymn.add({
  hymnNumber: {type: Types.Number, required: true, index: true, initial: true},
  title: {type: Types.Text, required: true, index: true, initial: true},
  bookId: {hidden: true, type: Types.Number},
  book: {emptyOption: true, type: Types.Select, options: books},
  chapterVerse: {type: Types.Text},
  lyrics: {type: Types.Markdown},
  wordsCopyright: {type: Types.Text},
  author: {type: Types.Relationship, ref: 'Author'},
  tune: {type: Types.Relationship, ref: 'Tune'},
  bio: {type: Types.Markdown},
  chapter: {type: Types.Number},
  verses: {type: Types.Text},
  files: {type: Types.Relationship, ref: 'File', many: true}
});

Hymn.schema
  .virtual('hasWordsCopyright')
  .get(() => !isEmpty(this.wordsCopyright));

Hymn.schema.index({title: 'text'});

Hymn.schema.pre('save', function(next) {
  this.bookId = findIndex(books, {value: this.book});

  return next();
});

transform.toJSON(Hymn);
Hymn.defaultColumns = 'title, hymnNumber, book, author, tune';
Hymn.register();
