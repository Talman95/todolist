import { useMemo } from 'react';

import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { useAppDispatch } from './useAppDispatch';

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
  const dispatch = useAppDispatch();

  const boundActions = useMemo(() => {
    return bindActionCreators(actions, dispatch);
  }, []);

  return boundActions;
}
