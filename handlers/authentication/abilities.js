const {AbilityBuilder} = require('@casl/ability');
const {hasIn} = require('lodash');

const admin = AbilityBuilder.define(can => {
  can('manage', 'all');
});

const committee = AbilityBuilder.define((can, cannot) => {
  can('read', 'all');
  cannot('manage', 'User');
});

const publicUser = AbilityBuilder.define((can, cannot) => {
  cannot('read', 'keystone');
});

const ABILITIES = {admin, committee, public: publicUser};

function defineAbilitiesFor(user) {
  return ABILITIES[user.role] || publicUser;
}

function createAbilities(req, res, next) {
  req.ability = hasIn(req, 'user.role')
    ? defineAbilitiesFor(req.user)
    : publicUser;
  next();
}

module.exports = {
  ABILITIES,
  createAbilities
};
