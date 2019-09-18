const {hasIn} = require('lodash');
const {ABILITIES, defineAbilitiesFor} = require('../../lib/abilities');

function createAbilities(req, res, next) {
  req.ability = hasIn(req, 'user.role')
    ? defineAbilitiesFor(req.user)
    : ABILITIES.public;
  next();
}

module.exports = {
  ABILITIES,
  createAbilities
};
