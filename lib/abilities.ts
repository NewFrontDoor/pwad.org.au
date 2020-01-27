import {AbilityBuilder, Ability} from '@casl/ability';

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

export const ABILITIES = {admin, committee, public: publicUser};

export function defineAbilitiesFor(user: any): Ability {
  return ABILITIES[user.role] || ABILITIES.public;
}
