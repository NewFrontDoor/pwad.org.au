const keystone = require('keystone');

const Menu = keystone.list('Menu').model;

const createMenu = ({code, name}) => new Menu({code, name}).save();

const importData = [
  {code: 'directory', name: 'Worship Directory'},
  {code: 'publications', name: 'GAA Publications'},
  {code: 'links', name: 'Useful Links'},
  {code: 'resources', name: 'PWAD Resources'}
];

module.exports = done =>
  Promise.all(importData.map(data => createMenu(data))).then(() => done());
