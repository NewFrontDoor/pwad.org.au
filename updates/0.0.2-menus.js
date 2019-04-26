const keystone = require('keystone');

const Menu = keystone.list('Menu').model;

const createMenu = ({code, name}) => new Menu({code, name}).save();

const importData = [
  {code: 'publications', name: 'GAA Publications'},
  {code: 'resources', name: 'PWAD Resources'},
  {code: 'devotion', name: 'Aids to Devotion'}
];

module.exports = done =>
  Promise.all(importData.map(data => createMenu(data))).then(() => done());
