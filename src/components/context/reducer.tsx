export interface IState {
  id?: string;
  username?: string;
  isLogin?: boolean;
}

export enum ACTIONS {
  USER_LOGIN = 'user_login',
  USER_LOGOUT = 'user_logout',
  USER_UPDATE = 'user_update',
}

interface UserLogin {
  type: ACTIONS.USER_LOGIN;
  payload: IState;
}

interface UserLogout {
  type: ACTIONS.USER_LOGOUT;
  payload: IState;
}

interface UpdateState {
  type: ACTIONS.USER_UPDATE;
  payload: IState;
}

export const initialState: IState = {
  id: '2022-01-24',
  username: 'visitor',
  isLogin: false,
};

export type Actions = UserLogin | UserLogout | UpdateState;

export const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case ACTIONS.USER_LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case ACTIONS.USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    case ACTIONS.USER_UPDATE:
      state.id = String(new Date().getUTCDate());
      state.username = action.payload.username;
      return state;
    default:
      return state;
  }
};
