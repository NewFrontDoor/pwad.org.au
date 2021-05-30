import {AbilityBuilder, Ability} from '@casl/ability';
import {User} from './graphql/gen-types';

type Actions = 'manage' | 'read';
type Subjects = 'all' | 'my-account' | 'Hymn' | 'User';
type Abilities = [Actions, Subjects];
export type PwadAbility = Ability<Abilities>;

export function defineAbilitiesFor(user?: User | null): PwadAbility {
  const {can, cannot, build} = new AbilityBuilder<PwadAbility>(Ability);

  switch (user?.role) {
    case 'admin':
      can('manage', 'all');
      break;

    case 'committee':
      can('read', 'all');
      can('manage', 'my-account');
      cannot('manage', 'User');
      break;

    default:
      if (user?.hasPaidAccount) {
        can('read', 'Hymn');
      }

      if (user) {
        can('manage', 'my-account');
      }

      break;
  }

  return build();
}
