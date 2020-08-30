import React, {FC, createContext} from 'react';
import PropTypes from 'prop-types';
import {Ability} from '@casl/ability';
import * as casl from '@casl/react';
import {defineAbilitiesFor} from '../../lib/abilities';
import {useMeQuery} from './queries';

const ability = new Ability([]);

const AbilityContext = createContext(ability);

export const AbilityProvider: FC = ({children}) => {
  useMeQuery({
    onCompleted(data) {
      const {rules} = defineAbilitiesFor(data.me);
      ability.update(rules);
    }
  });

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

AbilityProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAbility(): Ability {
  return casl.useAbility(AbilityContext);
}

export const Can = casl.createContextualCan(AbilityContext.Consumer);
