import {useReducer, useCallback} from 'react';

type State = true | false;
type Action = {type: 'toggle'};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'toggle':
      return !state;
    default:
      throw new Error(`Action type ${String(action.type)} does not exist`);
  }
}

function useToggle(initialState?: boolean): [boolean, () => void] {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleState = useCallback(() => {
    dispatch({type: 'toggle'});
  }, [dispatch]);

  return [state, toggleState];
}

export default useToggle;
