import {useReducer, useCallback} from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return !state;
    default:
      throw new Error(`Action type ${action.type} does not exist`);
  }
}

function useToggle(initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleState = useCallback(() => {
    dispatch({type: 'toggle'});
  }, [dispatch]);

  return [state, toggleState];
}

export default useToggle;
