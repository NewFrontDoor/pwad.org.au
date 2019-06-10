const keystone = require('keystone');

const PageContent = keystone.list('PageContent').model;

module.exports = done => {
  PageContent.find()
    .cursor()
    .on('data', pageContent => {
      const md = pageContent.get('content.extended.md');
      pageContent.set({content: {md}});
      pageContent.save();
    })
    .on('end', () => {
      done();
    });
};
