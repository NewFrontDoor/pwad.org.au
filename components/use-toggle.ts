import {useState, useCallback} from 'react';

function useToggle(
  initialState?: boolean
): [boolean, (newState?: boolean) => void] {
  const [state, setState] = useState(initialState);
  const toggleState = useCallback(
    (newState?: boolean) => {
      setState((state: boolean) => {
        if (typeof newState === 'undefined') {
          return !state;
        }

        return newState;
      });
    },
    [setState]
  );

  return [state, toggleState];
}

export default useToggle;
