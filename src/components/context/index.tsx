import React, { createContext, Dispatch, useReducer } from 'react';
import { reducer, IState, Actions, initialState } from './reducer';

interface IContextProps {
  state: IState;
  dispatch: Dispatch<Actions>;
}

export const AppContext = createContext({} as IContextProps);

export const AppProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
