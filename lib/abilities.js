const {AbilityBuilder} = require('@casl/ability');

const admin = AbilityBuilder.define(can => {
  can('manage', 'all');
});

const committee = AbilityBuilder.define((can, cannot) => {
  can('read', 'all');
  cannot('manage', 'User');
});

const publicUser = AbilityBuilder.define(can => {
  can('manage', 'my-account');
});

const ABILITIES = {admin, committee, public: publicUser};

function defineAbilitiesFor(user) {
  return ABILITIES[user.role] || ABILITIES.public;
}

module.exports = {
  ABILITIES,
  defineAbilitiesFor
};
