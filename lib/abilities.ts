import {AbilityBuilder, Ability} from '@casl/ability';
import {User} from './graphql/gen-types';

export function defineAbilitiesFor(user: User): Ability {
  let ability: Ability;

  switch (user?.role) {
    case 'admin':
      ability = AbilityBuilder.define((can: Ability['can']) => {
        can('manage', 'all');
      });
      break;

    case 'committee':
      ability = AbilityBuilder.define(
        (can: Ability['can'], cannot: Ability['cannot']) => {
          can('read', 'all');
          can('manage', 'my-account');
          cannot('manage', 'User');
        }
      );
      break;

    default:
      ability = AbilityBuilder.define((can: Ability['can']) => {
        if (user?.hasPaidAccount) {
          can('read', 'Hymn');
        }

        can('manage', 'my-account');
      });
      break;
  }

  return ability;
}
