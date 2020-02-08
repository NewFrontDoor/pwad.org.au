import React, {FC, createContext, useContext} from 'react';
import PropTypes from 'prop-types';
import {Ability} from '@casl/ability';
import {createContextualCan} from '@casl/react';
import {defineAbilitiesFor} from '../../lib/abilities';
import {useMeQuery} from './queries';

const ability = new Ability([]);

export const AbilityContext = createContext(ability);

export const AbilityProvider: FC = ({children}) => {
  useMeQuery({
    onCompleted(data) {
      if (data?.me) {
        const {rules} = defineAbilitiesFor(data.me);
        ability.update(rules);
      }
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
  return useContext(AbilityContext);
}

export const Can = createContextualCan(AbilityContext.Consumer);
