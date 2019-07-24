const keystone = require('keystone');
const books = require('../lib/books');

const Hymn = keystone.list('Hymn').model;

function batchPromises(batchSize, collection, callback) {
  return Promise.resolve(collection).then(arr =>
    arr
      .map((_, i) => (i % batchSize ? [] : arr.slice(i, i + batchSize)))
      .map(group => res =>
        Promise.all(group.map(callback)).then(r => res.concat(r))
      )
      .reduce((chain, work) => chain.then(work), Promise.resolve([]))
  );
}

module.exports = done => {
  Hymn.find({bookId: {$gte: 1}})
    .then(hymns =>
      batchPromises(5, hymns, async hymn => {
        if (books[hymn.bookId]) {
          hymn.book = books[hymn.bookId].value;
          return hymn.save();
        }
      })
    )
    .then(() => done())
    .catch(error => done(error));
};
