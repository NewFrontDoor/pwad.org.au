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
  author: {type: Types.Relationship, ref: 'Author'},
  bio: {type: Types.Markdown},
  book: {emptyOption: true, type: Types.Select, options: books},
  bookId: {hidden: true, type: Types.Number},
  chapter: {type: Types.Number},
  chapterVerse: {type: Types.Text},
  files: {type: Types.Relationship, ref: 'File', many: true},
  hymnNumber: {type: Types.Number, required: true, index: true, initial: true},
  keywords: {type: Types.Relationship, ref: 'Keyword', many: true},
  lyrics: {type: Types.Markdown},
  occasions: {type: Types.Relationship, ref: 'Occasion', many: true},
  title: {type: Types.Text, required: true, index: true, initial: true},
  tune: {type: Types.Relationship, ref: 'Tune', index: true},
  verses: {type: Types.Text},
  wordsCopyright: {type: Types.Text}
});

Hymn.schema
  .virtual('hasWordsCopyright')
  .get(() => !isEmpty(this.wordsCopyright));

Hymn.schema.index({title: 'text', lyrics: 'text'});

Hymn.schema.pre('save', function(next) {
  this.bookId = findIndex(books, {value: this.book});

  return next();
});

transform.toJSON(Hymn);
Hymn.defaultColumns = 'title, hymnNumber, book, author, tune';
Hymn.register();
