const fs = require('fs');
const csv = require('csv/lib/sync');
const keystone = require('keystone');

const Tune = keystone.list('Tune').model;

const data = csv.parse(fs.readFileSync('./import.csv'), {
  columns: true
});

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
  batchPromises(5, data, tune => {
    // const newHymn = new Hymn({
    //   title: hymn.title,
    //   hymnNumber: hymn.hymn_number ? parseInt(hymn.hymn_number, 10) : 0,
    //   bookId: hymn.book_id ? parseInt(hymn.book_id, 10) : 0,
    //   chapterVerse: hymn.chapter_verse,
    //   lyrics: {
    //     md: hymn.lyrics
    //   },
    //   wordsCopyright: hymn.words_copyright,
    //   bio: {
    //     md: hymn.bio
    //   },
    //   chapter: hymn.chapter ? parseInt(hymn.chapter, 10) : 0,
    //   verses: hymn.verses
    // });
    //
    // return newHymn.save();

    const newTune = new Tune({
      title: tune.title,
      musicCopyright: tune.music_copyright
    });

    return newTune.save();
  })
    .then(() => done())
    .catch(error => done(error));
};
