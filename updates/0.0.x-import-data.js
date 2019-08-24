const fs = require('fs');
// const util = require('util');
// const stream = require('stream');
// const {uniqBy} = require('lodash');
const csv = require('csv/lib/sync');
const keystone = require('keystone');
// const got = require('got');
// const {CookieJar} = require('tough-cookie');

// const pipeline = util.promisify(stream.pipeline);

const Tune = keystone.list('Tune').model;
const Hymn = keystone.list('Hymn').model;
const Keyword = keystone.list('Keyword').model;

// keystone.list('Hymn').schema.set('usePushEach', true);

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
  // const cookieJar = new CookieJar();
  // cookieJar.setCookieSync(
  //   '_hymnbase_session=cookie',
  //   'app.rejoicehymnbase.com.au'
  // );

  batchPromises(5, data, async result => {
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
    // const newFile = await File.findOneAndUpdate(
    //   {
    //     name: file.data_file_name
    //   },
    //   {
    //     name: file.data_file_name
    //   },
    //   {
    //     new: true,
    //     upsert: true
    //   }
    // );
    //
    // if (newFile.file && newFile.file.size) {
    //   return Promise.resolve();
    // }
    //
    // const url = `http://assets.rejoicehymnbase.com.au/system/data/${parseInt(
    //   file.id.replace(',', ''),
    //   10
    // )}/original/${file.data_file_name}`;
    //
    // const path = `./tmp/${file.data_file_name}`;
    //
    // await pipeline(got.stream(url, {cookieJar}), fs.createWriteStream(path));
    //
    // const uploaded = await new Promise((resolve, reject) => {
    //   newFile._.file.upload(
    //     {
    //       mimetype: file.data_content_type,
    //       path
    //     },
    //     (err, uploadedFile) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(uploadedFile);
    //       }
    //     }
    //   );
    // });
    //
    // newFile.set('file', uploaded);
    //
    // return newFile.save();
    const keyword = await Keyword.findOne({
      name: result.topicname
    }).exec();

    return Hymn.findOneAndUpdate(
      {
        title: result.hymntitle
      },
      {
        title: result.hymntitle,
        $push: {
          keywords: keyword
        }
      },
      {
        new: true,
        upsert: true
      }
    );
  })
    .then(() => done())
    .catch(error => done(error));
};
